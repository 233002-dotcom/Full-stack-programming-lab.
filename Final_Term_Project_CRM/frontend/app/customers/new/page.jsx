'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';

const INITIAL = { name: '', email: '', phone: '', company: '', status: 'Lead', address: '', notes: '' };

export default function NewCustomerPage() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    try {
      setLoading(true);
      await api.post('/customers', form);
      toast.success('Customer created successfully! 🎉');
      router.push('/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create customer');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <DashboardLayout title="Add Customer">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="page-header">
          <div>
            <Link href="/customers" className="btn btn-ghost btn-sm" style={{ marginBottom: 8, display: 'inline-flex' }}>
              <ArrowLeft size={15} /> Back to Customers
            </Link>
            <h2 className="page-heading">Add New Customer</h2>
            <p className="page-subheading">Fill in the details below to create a new customer record</p>
          </div>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} id="add-customer-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input id="customer-name" type="text" className="form-input" placeholder="John Smith" value={form.name} onChange={set('name')} />
                {errors.name && <span className="form-error">⚠ {errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input id="customer-email" type="email" className="form-input" placeholder="john@company.com" value={form.email} onChange={set('email')} />
                {errors.email && <span className="form-error">⚠ {errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input id="customer-phone" type="tel" className="form-input" placeholder="+1-555-0100" value={form.phone} onChange={set('phone')} />
                {errors.phone && <span className="form-error">⚠ {errors.phone}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input id="customer-company" type="text" className="form-input" placeholder="Acme Inc." value={form.company} onChange={set('company')} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select id="customer-status" className="form-input" value={form.status} onChange={set('status')}>
                  <option value="Lead">Lead</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input id="customer-address" type="text" className="form-input" placeholder="123 Main St, City, State" value={form.address} onChange={set('address')} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea id="customer-notes" className="form-input" placeholder="Additional notes about this customer..." value={form.notes} onChange={set('notes')} />
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button id="save-customer" type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Saving...</> : <><Save size={15} /> Save Customer</>}
              </button>
              <Link href="/customers" className="btn btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
