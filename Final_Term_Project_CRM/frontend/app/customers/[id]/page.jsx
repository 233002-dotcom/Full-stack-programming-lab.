'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import Modal from '@/components/Modal';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import {
  ArrowLeft, Edit2, Trash2, Mail, Phone,
  Building2, MapPin, FileText, DollarSign, Calendar
} from 'lucide-react';

const StatusBadge = ({ status }) => {
  const cls = status === 'Active' ? 'badge-active' : status === 'Lead' ? 'badge-lead' : 'badge-inactive';
  return <span className={`badge ${cls}`}>{status}</span>;
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={16} color="var(--accent-secondary)" />
    </div>
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{value || '—'}</div>
    </div>
  </div>
);

export default function CustomerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, iRes] = await Promise.all([
          api.get(`/customers/${id}`),
          api.get('/invoices'),
        ]);
        setCustomer(cRes.data.customer);
        const custInvoices = iRes.data.invoices.filter(inv => inv.customer?._id === id);
        setInvoices(custInvoices);
      } catch (err) {
        toast.error('Customer not found');
        router.push('/customers');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/customers/${id}`);
      toast.success('Customer deleted successfully');
      router.push('/customers');
    } catch (err) {
      toast.error('Failed to delete customer');
      setDeleting(false);
    }
  };

  if (loading) return (
    <DashboardLayout title="Customer Details">
      <div className="loading-screen"><div className="spinner" /></div>
    </DashboardLayout>
  );

  if (!customer) return null;

  const initials = customer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <DashboardLayout title="Customer Details">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Back + Actions */}
        <div className="page-header">
          <Link href="/customers" className="btn btn-ghost btn-sm">
            <ArrowLeft size={15} /> Back
          </Link>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href={`/customers/${id}/edit`} className="btn btn-secondary btn-sm">
              <Edit2 size={14} /> Edit
            </Link>
            <Link href={`/invoices/new?customer=${id}`} className="btn btn-primary btn-sm">
              <FileText size={14} /> Generate Invoice
            </Link>
            <button className="btn btn-danger btn-sm" onClick={() => setShowDelete(true)}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
          {/* Profile Card */}
          <div className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 auto 16px', boxShadow: 'var(--shadow-accent)' }}>
              {initials}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{customer.name}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>{customer.company || 'No Company'}</p>
            <StatusBadge status={customer.status} />
            <hr className="divider" />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'Outfit, sans-serif' }}>
                  ${(customer.totalSpent || 0).toLocaleString()}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Spent</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-secondary)', fontFamily: 'Outfit, sans-serif' }}>
                  {invoices.length}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Invoices</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="card">
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Contact Information</h3>
            <InfoRow icon={Mail} label="Email" value={customer.email} />
            <InfoRow icon={Phone} label="Phone" value={customer.phone} />
            <InfoRow icon={Building2} label="Company" value={customer.company} />
            <InfoRow icon={MapPin} label="Address" value={customer.address} />
            <InfoRow icon={Calendar} label="Customer Since" value={new Date(customer.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
            {customer.notes && (
              <div style={{ marginTop: 16, padding: 14, background: 'var(--bg-glass)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Notes</div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{customer.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Invoices */}
        {invoices.length > 0 && (
          <div className="section-card" style={{ marginTop: 24 }}>
            <div className="section-card-header">
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Invoices ({invoices.length})</h3>
              <Link href={`/invoices/new?customer=${id}`} className="btn btn-primary btn-sm">
                <FileText size={13} /> New Invoice
              </Link>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(inv => (
                    <tr key={inv._id}>
                      <td style={{ fontWeight: 600 }}>{inv.invoiceNumber}</td>
                      <td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>${inv.totalAmount?.toLocaleString()}</td>
                      <td><span className={`badge badge-${inv.status.toLowerCase()}`}>{inv.status}</span></td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Link href={`/invoices/${inv._id}`} className="btn btn-ghost btn-sm">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showDelete && (
        <Modal
          title="Delete Customer"
          message={`Are you sure you want to permanently delete "${customer.name}"? All associated data will be lost.`}
          confirmText={deleting ? 'Deleting...' : 'Yes, Delete'}
          danger
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </DashboardLayout>
  );
}
