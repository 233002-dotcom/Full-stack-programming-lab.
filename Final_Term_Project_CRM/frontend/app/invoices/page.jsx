'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { Plus, FileText, Eye, Trash2 } from 'lucide-react';
import Modal from '@/components/Modal';

const InvBadge = ({ status }) => (
  <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
);

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/invoices');
      setInvoices(data.invoices);
    } catch (err) {
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/invoices/${deleteId}`);
      toast.success('Invoice deleted');
      setDeleteId(null);
      fetchInvoices();
    } catch {
      toast.error('Failed to delete invoice');
    } finally {
      setDeleting(false);
    }
  };

  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.totalAmount, 0);
  const pending = invoices.filter(i => i.status === 'Sent').length;

  return (
    <DashboardLayout title="Invoices">
      <div>
        <div className="page-header">
          <div>
            <h2 className="page-heading">Invoice Management</h2>
            <p className="page-subheading">{invoices.length} invoice{invoices.length !== 1 ? 's' : ''} · ${totalRevenue.toLocaleString()} collected · {pending} pending</p>
          </div>
          <Link href="/invoices/new" className="btn btn-primary">
            <Plus size={16} /> New Invoice
          </Link>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="loading-screen" style={{ minHeight: 200 }}><div className="spinner" /></div>
          ) : invoices.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🧾</div>
              <h3 className="empty-state-title">No invoices yet</h3>
              <p className="empty-state-text">Create your first invoice to start billing customers.</p>
              <Link href="/invoices/new" className="btn btn-primary"><Plus size={15} /> Create Invoice</Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Customer</th>
                    <th>Company</th>
                    <th>Subtotal</th>
                    <th>Tax</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv._id}>
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--accent-secondary)', fontFamily: 'monospace', fontSize: 13 }}>
                          {inv.invoiceNumber}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{inv.customer?.name || '—'}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{inv.customer?.email}</div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{inv.customer?.company || '—'}</td>
                      <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>${inv.subtotal?.toLocaleString()}</td>
                      <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{inv.tax}%</td>
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: 15 }}>
                          ${inv.totalAmount?.toLocaleString()}
                        </span>
                      </td>
                      <td><InvBadge status={inv.status} /></td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                        {new Date(inv.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                          <Link href={`/invoices/${inv._id}`} className="btn btn-ghost btn-sm" title="View & Download">
                            <Eye size={15} />
                          </Link>
                          <button className="btn btn-ghost btn-sm" title="Delete" style={{ color: 'var(--accent-rose)' }} onClick={() => setDeleteId(inv._id)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <Modal
          title="Delete Invoice"
          message="Are you sure you want to delete this invoice? This action is permanent."
          confirmText={deleting ? 'Deleting...' : 'Delete'}
          danger
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </DashboardLayout>
  );
}
