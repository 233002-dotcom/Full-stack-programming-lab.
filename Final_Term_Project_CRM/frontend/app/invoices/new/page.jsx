'use client';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';

const emptyService = () => ({ description: '', quantity: 1, unitPrice: 0 });

function NewInvoiceForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCustomer = searchParams.get('customer');

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState(preselectedCustomer || '');
  const [services, setServices] = useState([emptyService()]);
  const [tax, setTax] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Draft');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/customers?limit=100')
      .then(({ data }) => setCustomers(data.customers))
      .catch(() => toast.error('Failed to load customers'));
  }, []);

  const updateService = (i, field, val) => {
    const updated = [...services];
    updated[i] = { ...updated[i], [field]: field === 'description' ? val : Number(val) };
    setServices(updated);
  };

  const removeService = (i) => setServices(services.filter((_, idx) => idx !== i));

  const subtotal = services.reduce((s, svc) => s + svc.quantity * svc.unitPrice, 0);
  const taxAmount = (subtotal * tax) / 100;
  const total = subtotal + taxAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId) { toast.error('Please select a customer'); return; }
    if (services.some(s => !s.description.trim())) { toast.error('All services need a description'); return; }
    try {
      setSaving(true);
      const { data } = await api.post('/invoices', { customerId, services, tax, dueDate, notes, status });
      toast.success(`Invoice ${data.invoice.invoiceNumber} created! 🎉`);
      router.push(`/invoices/${data.invoice._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create invoice');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="create-invoice-form">
      {/* Customer & Details */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Invoice Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Customer *</label>
            <select id="invoice-customer" className="form-input" value={customerId} onChange={e => setCustomerId(e.target.value)} required>
              <option value="">Select customer...</option>
              {customers.map(c => (
                <option key={c._id} value={c._id}>{c.name} — {c.company || c.email}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select id="invoice-status" className="form-input" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Tax (%)</label>
            <input id="invoice-tax" type="number" className="form-input" min="0" max="100" value={tax} onChange={e => setTax(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input id="invoice-due-date" type="date" className="form-input" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Notes / Summary</label>
          <textarea id="invoice-notes" className="form-input" placeholder="Payment terms, additional information..." value={notes} onChange={e => setNotes(e.target.value)} style={{ minHeight: 80 }} />
        </div>
      </div>

      {/* Services */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Services / Line Items</h3>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setServices([...services, emptyService()])}>
            <Plus size={14} /> Add Row
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '45%' }}>Description</th>
                <th style={{ width: '15%' }}>Qty</th>
                <th style={{ width: '20%' }}>Unit Price</th>
                <th style={{ width: '15%' }}>Total</th>
                <th style={{ width: '5%' }}></th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc, i) => (
                <tr key={i}>
                  <td>
                    <input type="text" className="form-input" placeholder="Service description..." value={svc.description} onChange={e => updateService(i, 'description', e.target.value)} style={{ fontSize: 13 }} />
                  </td>
                  <td>
                    <input type="number" className="form-input" min="1" value={svc.quantity} onChange={e => updateService(i, 'quantity', e.target.value)} style={{ fontSize: 13 }} />
                  </td>
                  <td>
                    <input type="number" className="form-input" min="0" step="0.01" value={svc.unitPrice} onChange={e => updateService(i, 'unitPrice', e.target.value)} style={{ fontSize: 13 }} />
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    ${(svc.quantity * svc.unitPrice).toLocaleString()}
                  </td>
                  <td>
                    {services.length > 1 && (
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeService(i)} style={{ color: 'var(--accent-rose)' }}>
                        <Trash2 size={13} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--bg-glass)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ display: 'flex', gap: 48, color: 'var(--text-secondary)', fontSize: 14 }}>
              <span>Subtotal:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', minWidth: 80, textAlign: 'right' }}>${subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', gap: 48, color: 'var(--text-secondary)', fontSize: 14 }}>
              <span>Tax ({tax}%):</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', minWidth: 80, textAlign: 'right' }}>${taxAmount.toFixed(2)}</span>
            </div>
            <hr style={{ width: '100%', border: 'none', borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />
            <div style={{ display: 'flex', gap: 48, fontSize: 18, fontWeight: 800 }}>
              <span style={{ color: 'var(--text-primary)' }}>Total:</span>
              <span style={{ color: 'var(--accent-emerald)', minWidth: 80, textAlign: 'right' }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button id="save-invoice" type="submit" className="btn btn-primary btn-lg" disabled={saving}>
          {saving ? <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Creating...</> : <><Save size={16} /> Create Invoice</>}
        </button>
        <Link href="/invoices" className="btn btn-secondary btn-lg">Cancel</Link>
      </div>
    </form>
  );
}

export default function NewInvoicePage() {
  return (
    <DashboardLayout title="New Invoice">
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div className="page-header">
          <div>
            <Link href="/invoices" className="btn btn-ghost btn-sm" style={{ marginBottom: 8, display: 'inline-flex' }}>
              <ArrowLeft size={15} /> Back to Invoices
            </Link>
            <h2 className="page-heading">Create Invoice</h2>
            <p className="page-subheading">Generate a new invoice for a customer</p>
          </div>
        </div>
        <Suspense fallback={<div className="loading-screen"><div className="spinner" /></div>}>
          <NewInvoiceForm />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
