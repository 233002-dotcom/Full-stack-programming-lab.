'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      await login(form.email, form.password);
      toast.success('Welcome back! 👋');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">⚡</div>
          <span className="auth-logo-text">CRM Pro</span>
        </div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your CRM dashboard</p>

        <form onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="form-input-icon">
              <Mail className="input-icon" size={16} />
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="admin@crm.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input-icon">
              <Lock className="input-icon" size={16} />
              <input
                id="login-password"
                type={showPw ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password"
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            id="login-submit"
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? (
              <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Signing in...</>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <hr className="divider" />

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Demo credentials:</p>
          <code style={{ fontSize: 12, color: 'var(--accent-secondary)', background: 'rgba(108,99,255,0.1)', padding: '4px 10px', borderRadius: 6 }}>
            admin@crm.com / admin123
          </code>
        </div>

        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="link">Create one</Link>
        </p>
      </div>
    </div>
  );
}
