'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import api from '@/lib/axios';
import { Users, TrendingUp, FileText, DollarSign, Plus, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const [customerStats, setCustomerStats] = useState(null);
  const [invoiceStats, setInvoiceStats] = useState(null);
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cStats, iStats, cList, iList] = await Promise.all([
          api.get('/customers/stats'),
          api.get('/invoices/stats'),
          api.get('/customers?limit=5'),
          api.get('/invoices'),
        ]);
        setCustomerStats(cStats.data.stats);
        setInvoiceStats(iStats.data.stats);
        setRecentCustomers(cList.data.customers);
        setRecentInvoices(iList.data.invoices.slice(0, 5));
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusBadge = (s) => {
    const cls = s === 'Active' ? 'badge-active' : s === 'Lead' ? 'badge-lead' : 'badge-inactive';
    return <span className={`badge ${cls}`}>{s}</span>;
  };

  const invBadge = (s) => {
    const cls = `badge-${s.toLowerCase()}`;
    return <span className={`badge ${cls}`}>{s}</span>;
  };

  return (
    <DashboardLayout title="Dashboard">
      <div>
        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          <Link href="/customers/new" className="btn btn-primary">
            <Plus size={16} /> Add Customer
          </Link>
          <Link href="/invoices/new" className="btn btn-secondary">
            <FileText size={16} /> New Invoice
          </Link>
          <Link href="/customers" className="btn btn-secondary">
            <Users size={16} /> View All Customers
          </Link>
        </div>

        {/* Stat Cards */}
        {loading ? (
          <div className="loading-screen"><div className="spinner" /></div>
        ) : (
          <>
            <div className="stat-grid">
              <StatCard
                icon={<Users size={22} />}
                label="Total Customers"
                value={customerStats?.total || 0}
                colorClass="purple"
                changePct={12}
                change="this month"
              />
              <StatCard
                icon={<TrendingUp size={22} />}
                label="Active Customers"
                value={customerStats?.active || 0}
                colorClass="emerald"
                changePct={8}
                change="vs last month"
              />
              <StatCard
                icon={<span>🎯</span>}
                label="Leads"
                value={customerStats?.leads || 0}
                colorClass="amber"
                changePct={5}
                change="new leads"
              />
              <StatCard
                icon={<FileText size={22} />}
                label="Total Invoices"
                value={invoiceStats?.total || 0}
                colorClass="cyan"
              />
              <StatCard
                icon={<DollarSign size={22} />}
                label="Total Revenue"
                value={`$${(invoiceStats?.totalRevenue || 0).toLocaleString()}`}
                colorClass="emerald"
                changePct={22}
                change="this quarter"
              />
              <StatCard
                icon={<span>⏰</span>}
                label="Pending Invoices"
                value={invoiceStats?.pending || 0}
                colorClass="amber"
              />
            </div>

            {/* Recent Customers & Invoices */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Recent Customers */}
              <div className="section-card">
                <div className="section-card-header">
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Recent Customers</h2>
                  <Link href="/customers" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--accent-secondary)' }}>
                    View all <ArrowRight size={13} />
                  </Link>
                </div>
                <div>
                  {recentCustomers.map((c) => (
                    <Link key={c._id} href={`/customers/${c._id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-glass)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>
                          {c.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.company || c.email}</div>
                        </div>
                      </div>
                      {statusBadge(c.status)}
                    </Link>
                  ))}
                  {!recentCustomers.length && (
                    <div className="empty-state" style={{ padding: 40 }}>
                      <p className="empty-state-text">No customers yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Invoices */}
              <div className="section-card">
                <div className="section-card-header">
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Recent Invoices</h2>
                  <Link href="/invoices" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--accent-secondary)' }}>
                    View all <ArrowRight size={13} />
                  </Link>
                </div>
                <div>
                  {recentInvoices.map((inv) => (
                    <Link key={inv._id} href={`/invoices/${inv._id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-glass)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{inv.invoiceNumber}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{inv.customer?.name}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-emerald)' }}>${inv.totalAmount?.toLocaleString()}</div>
                        {invBadge(inv.status)}
                      </div>
                    </Link>
                  ))}
                  {!recentInvoices.length && (
                    <div className="empty-state" style={{ padding: 40 }}>
                      <p className="empty-state-text">No invoices yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
