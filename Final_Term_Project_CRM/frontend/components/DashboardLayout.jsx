'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/Chatbot';

export default function DashboardLayout({ children, title }) {
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="loading-screen" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title={title} />
        <main className="page-container">{children}</main>
      </div>
      <Chatbot onLogout={logout} />
    </div>
  );
}
