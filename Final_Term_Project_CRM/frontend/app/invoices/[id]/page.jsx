'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Download, Printer, Edit2, Trash2 } from 'lucide-react';
import Modal from '@/components/Modal';

const StatusBadge = ({ status }) => (
  <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
);

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    api.get(`/invoices/${id}`)
      .then(({ data }) => setInvoice(data.invoice))
      .catch(() => { toast.error('Invoice not found'); router.push('/invoices'); })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/invoices/${id}`);
      toast.success('Invoice deleted');
      router.push('/invoices');
    } catch { toast.error('Failed to delete'); setDeleting(false); }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      const { data } = await api.put(`/invoices/${id}`, { status: newStatus });
      setInvoice(data.invoice);
      toast.success(`Status updated to ${newStatus}`);
    } catch { toast.error('Failed to update status'); }
    finally { setUpdatingStatus(false); }
  };

  const downloadPDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF({ format: 'a4', unit: 'mm' });
    const c = invoice.customer;
    const pageW = 210;

    // Header band
    doc.setFillColor(108, 99, 255);
    doc.rect(0, 0, pageW, 36, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('CRM Pro', 14, 16);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Professional Invoice', 14, 24);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', pageW - 14, 20, { align: 'right' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.invoiceNumber, pageW - 14, 28, { align: 'right' });

    // From / To
    doc.setTextColor(30, 30, 60);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO', 14, 50);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(c?.name || 'N/A', 14, 57);
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 110);
    if (c?.company) doc.text(c.company, 14, 63);
    doc.text(c?.email || '', 14, c?.company ? 69 : 63);

    // Invoice meta
    const metaX = pageW - 80;
    doc.setTextColor(80, 80, 110);
    doc.setFontSize(9);
    const rows = [
      ['Issue Date:', new Date(invoice.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
      ['Due Date:', invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'On Receipt'],
      ['Status:', invoice.status],
    ];
    rows.forEach(([label, val], i) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, metaX, 50 + i * 8);
      doc.setFont('helvetica', 'normal');
      doc.text(val, pageW - 14, 50 + i * 8, { align: 'right' });
    });

    // Divider
    doc.setDrawColor(220, 220, 240);
    doc.line(14, 80, pageW - 14, 80);

    // Table header
    doc.setFillColor(240, 238, 255);
    doc.rect(14, 84, pageW - 28, 8, 'F');
    doc.setTextColor(60, 60, 120);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('DESCRIPTION', 18, 90);
    doc.text('QTY', 120, 90);
    doc.text('UNIT PRICE', 140, 90);
    doc.text('TOTAL', pageW - 18, 90, { align: 'right' });

    // Items
    let y = 98;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 30, 60);
    invoice.services.forEach((s, i) => {
      if (i % 2 === 0) {
        doc.setFillColor(252, 252, 255);
        doc.rect(14, y - 4, pageW - 28, 8, 'F');
      }
      doc.text(s.description, 18, y);
      doc.text(String(s.quantity), 123, y);
      doc.text(`$${s.unitPrice.toFixed(2)}`, 143, y);
      doc.text(`$${s.total.toFixed(2)}`, pageW - 18, y, { align: 'right' });
      y += 9;
    });

    // Totals box
    y += 6;
    const boxX = pageW - 90;
    doc.setFillColor(248, 247, 255);
    doc.rect(boxX, y, 76, 30, 'F');
    doc.setDrawColor(200, 196, 255);
    doc.rect(boxX, y, 76, 30);
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 110);
    doc.text('Subtotal:', boxX + 4, y + 8);
    doc.text(`$${invoice.subtotal.toFixed(2)}`, pageW - 18, y + 8, { align: 'right' });
    doc.text(`Tax (${invoice.tax}%):`, boxX + 4, y + 16);
    const taxAmt = ((invoice.subtotal * invoice.tax) / 100).toFixed(2);
    doc.text(`$${taxAmt}`, pageW - 18, y + 16, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(108, 99, 255);
    doc.text('TOTAL:', boxX + 4, y + 26);
    doc.text(`$${invoice.totalAmount.toFixed(2)}`, pageW - 18, y + 26, { align: 'right' });

    // Notes
    if (invoice.notes) {
      y += 42;
      doc.setFillColor(252, 252, 255);
      doc.rect(14, y, pageW - 28, 20, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 120);
      doc.text('Notes:', 18, y + 7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 110);
      const lines = doc.splitTextToSize(invoice.notes, pageW - 44);
      doc.text(lines, 18, y + 14);
    }

    // Footer
    doc.setFillColor(108, 99, 255);
    doc.rect(0, 285, pageW, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Generated by CRM Pro  |  Thank you for your business!', pageW / 2, 292, { align: 'center' });

    doc.save(`${invoice.invoiceNumber}.pdf`);
    toast.success('PDF downloaded! 📄');
  };

  if (loading) return (
    <DashboardLayout title="Invoice">
      <div className="loading-screen"><div className="spinner" /></div>
    </DashboardLayout>
  );

  if (!invoice) return null;
  const c = invoice.customer;
  const taxAmt = (invoice.subtotal * invoice.tax / 100);

  return (
    <DashboardLayout title={invoice.invoiceNumber}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="page-header">
          <div>
            <Link href="/invoices" className="btn btn-ghost btn-sm" style={{ marginBottom: 8, display: 'inline-flex' }}>
              <ArrowLeft size={15} /> Back to Invoices
            </Link>
            <h2 className="page-heading">{invoice.invoiceNumber}</h2>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <select
              className="filter-select"
              value={invoice.status}
              onChange={e => handleStatusChange(e.target.value)}
              disabled={updatingStatus}
              id="invoice-status-update"
              style={{ height: 38 }}
            >
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
            <button className="btn btn-primary" onClick={downloadPDF} id="download-pdf">
              <Download size={15} /> Download PDF
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => setShowDelete(true)}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Invoice Preview Card */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', marginBottom: 24 }} id="invoice-preview">
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)', padding: '28px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>CRM Pro</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Professional Invoice</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>INVOICE</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>{invoice.invoiceNumber}</div>
            </div>
          </div>

          <div style={{ padding: '32px 36px' }}>
            {/* Bill To + Meta */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#6c63ff', marginBottom: 8 }}>Bill To</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#1e1e3c' }}>{c?.name}</div>
                {c?.company && <div style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{c.company}</div>}
                <div style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{c?.email}</div>
                {c?.phone && <div style={{ fontSize: 13, color: '#555' }}>{c.phone}</div>}
                {c?.address && <div style={{ fontSize: 13, color: '#555' }}>{c.address}</div>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Issue Date: </span>
                  <span style={{ fontSize: 13, color: '#333' }}>{new Date(invoice.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                {invoice.dueDate && (
                  <div style={{ marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Due Date: </span>
                    <span style={{ fontSize: 13, color: '#333' }}>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
                <div style={{ marginTop: 8 }}>
                  <StatusBadge status={invoice.status} />
                </div>
              </div>
            </div>

            {/* Services Table */}
            <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e8e6ff', marginBottom: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f0eeff' }}>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#6c63ff', letterSpacing: '0.5px' }}>Description</th>
                    <th style={{ padding: '10px 16px', textAlign: 'center', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#6c63ff', letterSpacing: '0.5px', width: 80 }}>Qty</th>
                    <th style={{ padding: '10px 16px', textAlign: 'right', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#6c63ff', letterSpacing: '0.5px', width: 110 }}>Unit Price</th>
                    <th style={{ padding: '10px 16px', textAlign: 'right', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#6c63ff', letterSpacing: '0.5px', width: 110 }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.services.map((s, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #ece9ff', background: i % 2 === 0 ? '#fff' : '#faf9ff' }}>
                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#222' }}>{s.description}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: 14, color: '#444' }}>{s.quantity}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 14, color: '#444' }}>${s.unitPrice.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 14, fontWeight: 700, color: '#1e1e3c' }}>${s.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ minWidth: 260, background: '#f8f7ff', borderRadius: 10, border: '1px solid #e0dcff', padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#666' }}>Subtotal</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: '#666' }}>Tax ({invoice.tax}%)</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>${taxAmt.toFixed(2)}</span>
                </div>
                <div style={{ borderTop: '2px solid #e0dcff', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#1e1e3c' }}>Total</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: '#6c63ff' }}>${invoice.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div style={{ marginTop: 24, padding: '14px 18px', background: '#f8f7ff', borderRadius: 8, border: '1px solid #e0dcff' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#6c63ff', marginBottom: 6 }}>Notes</div>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{invoice.notes}</p>
              </div>
            )}

            {/* Footer */}
            <div style={{ marginTop: 32, textAlign: 'center', paddingTop: 20, borderTop: '1px solid #ece9ff' }}>
              <p style={{ fontSize: 12, color: '#999' }}>Generated by CRM Pro · Thank you for your business!</p>
            </div>
          </div>
        </div>
      </div>

      {showDelete && (
        <Modal
          title="Delete Invoice"
          message={`Delete invoice ${invoice.invoiceNumber}? This action cannot be undone.`}
          confirmText={deleting ? 'Deleting...' : 'Delete'}
          danger
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </DashboardLayout>
  );
}
