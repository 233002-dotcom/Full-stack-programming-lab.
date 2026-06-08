'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditCustomerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', status: 'Lead', address: '', notes: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get(`/customers/${id}`)
      .then(({ data }) => setForm({
        name: data.customer.name || '',
        email: data.customer.email || '',
        phone: data.customer.phone || '',
        company: data.customer.company || '',
        status: data.customer.status || 'Lead',
        address: data.customer.address || '',
        notes: data.customer.notes || '',
      }))
      .catch(() => { toast.error('Customer not found'); router.push('/customers'); })
      .finally(() => setLoading(false));
  }, [id, router]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    try {
      setSaving(true);
      await api.put(`/customers/${id}`, form);
      toast.success('Customer updated successfully! ✅');
      router.push(`/customers/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  if (loading) return (
    <DashboardLayout title="Edit Customer">
      <div className="loading-screen"><div className="spinner" /></div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title="Edit Customer">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="page-header">
          <div>
            <Link href={`/customers/${id}`} className="btn btn-ghost btn-sm" style={{ marginBottom: 8, display: 'inline-flex' }}>
              <ArrowLeft size={15} /> Back to Customer
            </Link>
            <h2 className="page-heading">Edit Customer</h2>
            <p className="page-subheading">Update the customer information below</p>
          </div>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} id="edit-customer-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input id="edit-name" type="text" className="form-input" value={form.name} onChange={set('name')} placeholder="John Smith" />
                {errors.name && <span className="form-error">⚠ {errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input id="edit-email" type="email" className="form-input" value={form.email} onChange={set('email')} placeholder="john@company.com" />
                {errors.email && <span className="form-error">⚠ {errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input id="edit-phone" type="tel" className="form-input" value={form.phone} onChange={set('phone')} placeholder="+1-555-0100" />
                {errors.phone && <span className="form-error">⚠ {errors.phone}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input id="edit-company" type="text" className="form-input" value={form.company} onChange={set('company')} placeholder="Acme Inc." />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select id="edit-status" className="form-input" value={form.status} onChange={set('status')}>
                  <option value="Lead">Lead</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input id="edit-address" type="text" className="form-input" value={form.address} onChange={set('address')} placeholder="123 Main St, City" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea id="edit-notes" className="form-input" value={form.notes} onChange={set('notes')} placeholder="Additional notes..." />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button id="update-customer" type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Updating...</> : <><Save size={15} /> Update Customer</>}
              </button>
              <Link href={`/customers/${id}`} className="btn btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
