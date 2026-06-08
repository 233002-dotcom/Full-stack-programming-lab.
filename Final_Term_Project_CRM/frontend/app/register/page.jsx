'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      setLoading(true);
      await register(form.name, form.email, form.password);
      toast.success('Account created successfully! 🎉');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Start managing your customers today</p>

        <form onSubmit={handleSubmit} id="register-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="form-input-icon">
              <User className="input-icon" size={16} />
              <input
                id="register-name"
                type="text"
                className="form-input"
                placeholder="John Smith"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="form-input-icon">
              <Mail className="input-icon" size={16} />
              <input
                id="register-email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input-icon">
              <Lock className="input-icon" size={16} />
              <input
                id="register-password"
                type={showPw ? 'text' : 'password'}
                className="form-input"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="form-input-icon">
              <Lock className="input-icon" size={16} />
              <input
                id="register-confirm"
                type="password"
                className="form-input"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              />
            </div>
          </div>

          <button
            id="register-submit"
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? (
              <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Creating account...</>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <hr className="divider" />

        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link href="/login" className="link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
