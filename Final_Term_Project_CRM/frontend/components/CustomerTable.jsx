'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Edit2, Trash2, Eye, Mail, Phone, Building2 } from 'lucide-react';
import Modal from './Modal';
import toast from 'react-hot-toast';
import api from '@/lib/axios';

const StatusBadge = ({ status }) => {
  const cls = status === 'Active' ? 'badge-active' : status === 'Lead' ? 'badge-lead' : 'badge-inactive';
  return <span className={`badge ${cls}`}>{status}</span>;
};

export default function CustomerTable({ customers, onDeleted }) {
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/customers/${deleteId}`);
      toast.success('Customer deleted successfully');
      setDeleteId(null);
      onDeleted?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete customer');
    } finally {
      setDeleting(false);
    }
  };

  if (!customers?.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">👥</div>
        <h3 className="empty-state-title">No customers found</h3>
        <p className="empty-state-text">Try adjusting your search or filter, or add a new customer.</p>
        <Link href="/customers/new" className="btn btn-primary">+ Add Customer</Link>
      </div>
    );
  }

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Total Spent</th>
              <th>Joined</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="avatar" style={{ width: 36, height: 36, fontSize: 13 }}>
                      {c.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 13 }}>
                    <Building2 size={13} />
                    {c.company || '—'}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 13 }}>
                    <Phone size={13} />
                    {c.phone}
                  </div>
                </td>
                <td><StatusBadge status={c.status} /></td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--accent-emerald)' }}>
                    ${(c.totalSpent || 0).toLocaleString()}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                  {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                    <Link href={`/customers/${c._id}`} className="btn btn-ghost btn-sm" title="View">
                      <Eye size={15} />
                    </Link>
                    <Link href={`/customers/${c._id}/edit`} className="btn btn-ghost btn-sm" title="Edit">
                      <Edit2 size={15} />
                    </Link>
                    <button
                      className="btn btn-ghost btn-sm"
                      title="Delete"
                      onClick={() => setDeleteId(c._id)}
                      style={{ color: 'var(--accent-rose)' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <Modal
          title="Delete Customer"
          message="Are you sure you want to delete this customer? This action cannot be undone."
          confirmText={deleting ? 'Deleting...' : 'Delete'}
          danger
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  );
}
