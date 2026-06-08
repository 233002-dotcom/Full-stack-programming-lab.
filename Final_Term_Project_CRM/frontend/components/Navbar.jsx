'use client';
import { useAuth } from '@/context/AuthContext';
import { Bell, Search } from 'lucide-react';

export default function Navbar({ title = 'Dashboard' }) {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="navbar-right">
        <button className="btn-ghost" title="Notifications" style={{ position: 'relative' }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 8, height: 8, background: '#f43f5e',
            borderRadius: '50%', border: '2px solid var(--bg-secondary)'
          }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-glass)', border: '1px solid var(--border-color)' }}>
          <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{initials}</div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name || 'User'}</span>
        </div>
      </div>
    </header>
  );
}
