import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'CRM Pro — Customer Relationship Management',
  description: 'Modern CRM system to manage customers, invoices and business operations efficiently.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#16181f',
                color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
              error: { iconTheme: { primary: '#f43f5e', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
