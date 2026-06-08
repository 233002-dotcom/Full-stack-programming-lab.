'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import CustomerTable from '@/components/CustomerTable';
import SearchFilter from '@/components/SearchFilter';
import api from '@/lib/axios';
import { Plus, Download } from 'lucide-react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status) params.append('status', status);
      params.append('limit', '100');
      const { data } = await api.get(`/customers?${params}`);
      setCustomers(data.customers);
      setFiltered(data.customers);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const t = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(t);
  }, [fetchCustomers]);

  return (
    <DashboardLayout title="Customers">
      <div>
        <div className="page-header">
          <div>
            <h2 className="page-heading">Customer Management</h2>
            <p className="page-subheading">{total} customer{total !== 1 ? 's' : ''} in your CRM</p>
          </div>
          <Link href="/customers/new" className="btn btn-primary">
            <Plus size={16} /> Add Customer
          </Link>
        </div>

        <div className="section-card">
          <div className="section-card-header">
            <SearchFilter
              search={search}
              onSearch={setSearch}
              status={status}
              onStatus={setStatus}
            />
            <span style={{ fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loading ? (
            <div className="loading-screen" style={{ minHeight: 200 }}>
              <div className="spinner" />
            </div>
          ) : (
            <CustomerTable customers={filtered} onDeleted={fetchCustomers} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
