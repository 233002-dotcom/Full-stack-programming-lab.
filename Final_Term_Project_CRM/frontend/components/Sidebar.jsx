'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Users, FileText, Plus,
  LogOut, Settings, TrendingUp, ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/customers', icon: Users, label: 'Customers' },
  { href: '/invoices', icon: FileText, label: 'Invoices' },
  { href: '/customers/new', icon: Plus, label: 'Add Customer' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">⚡</div>
        <span className="sidebar-logo-text">CRM Pro</span>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Main Menu</span>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href) && href !== '/customers/new');
          return (
            <Link key={href} href={href} className={`sidebar-link ${active ? 'active' : ''}`}>
              <Icon className="sidebar-link-icon" size={18} />
              {label}
              {active && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
            </Link>
          );
        })}

        <span className="sidebar-section-label">Analytics</span>
        <Link href="/dashboard" className={`sidebar-link ${pathname === '/dashboard' ? 'active' : ''}`}>
          <TrendingUp className="sidebar-link-icon" size={18} />
          Reports
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name || 'User'}
            </div>
            <div className="user-role">{user?.role || 'Member'}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="sidebar-link"
          style={{ width: '100%', background: 'none', border: 'none', marginTop: 4 }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
