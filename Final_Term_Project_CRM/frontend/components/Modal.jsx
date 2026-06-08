'use client';
import { useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function Modal({ title, message, onConfirm, onCancel, confirmText = 'Confirm', danger = false }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCancel]);

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onCancel(); }}>
      <div className="modal">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
          {danger && (
            <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(244,63,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertTriangle size={20} color="#f43f5e" />
            </div>
          )}
          <div>
            <h2 className="modal-title">{title}</h2>
            <p className="modal-text">{message}</p>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
