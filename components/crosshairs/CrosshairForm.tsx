'use client';

import { Crosshair } from '@/types';
import { FormEvent, useState } from 'react';
import { CrosshairPreview } from './CrosshairPreview';
import { Copy, Plus, X } from 'lucide-react';

interface CrosshairFormProps {
  onAdd: (crosshair: Omit<Crosshair, 'id' | 'createdAt'>) => void;
}

export function CrosshairForm({ onAdd }: CrosshairFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', description: '' });
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) return;
    onAdd({
      name: formData.name,
      code: formData.code,
      description: formData.description || undefined,
    });
    setFormData({ name: '', code: '', description: '' });
    setIsOpen(false);
  };

  const handleCopy = async () => {
    if (!formData.code) return;
    await navigator.clipboard.writeText(formData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle = {
    background: '#0a0a0a',
    border: '1px solid #2a2a2a',
    borderRadius: 8,
    color: '#ffffff',
    padding: '10px 14px',
    width: '100%',
    fontSize: 13,
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: '#444444',
    marginBottom: 6,
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            background: 'rgba(255,85,0,0.08)',
            border: '1px solid #ff5500',
            color: '#ff5500',
          }}
        >
          <Plus className="w-4 h-4" />
          Nueva mira
        </button>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: '#0d0d0d', border: '1px solid #1e1e1e' }}
        >
          {/* Header del form */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: '1px solid #1a1a1a' }}
          >
            <span className="text-sm font-semibold" style={{ color: '#ffffff' }}>
              Nueva mira
            </span>
            <button
              type="button"
              onClick={() => { setIsOpen(false); setFormData({ name: '', code: '', description: '' }); }}
              className="p-1 rounded transition-colors"
              style={{ color: '#444444' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#444444')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Formulario izquierdo */}
              <div className="p-5 space-y-4" style={{ borderRight: '1px solid #1a1a1a' }}>
                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input
                    type="text"
                    placeholder="ej: Mira competitiva standard"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ff5500')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Código</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      style={{ ...inputStyle, fontFamily: 'monospace', paddingRight: 40, color: '#ff5500' }}
                      onFocus={e => (e.target.style.borderColor = '#ff5500')}
                      onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                    />
                    {formData.code && (
                      <button
                        type="button"
                        onClick={handleCopy}
                        style={{
                          position: 'absolute', right: 10, top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: copied ? '#22c55e' : '#444444', padding: 0,
                        }}
                        title="Copiar código"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Descripción <span style={{ color: '#2a2a2a', textTransform: 'none', letterSpacing: 0 }}>— opcional</span></label>
                  <input
                    type="text"
                    placeholder="ej: Para retakes, baja sensibilidad"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ff5500')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!formData.name.trim() || !formData.code.trim()}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: formData.name && formData.code ? '#ff5500' : '#1a1a1a',
                    color: formData.name && formData.code ? '#ffffff' : '#333333',
                    border: 'none',
                    cursor: formData.name && formData.code ? 'pointer' : 'not-allowed',
                  }}
                >
                  Guardar mira
                </button>
              </div>

              {/* Preview derecho — siempre visible */}
              <div
                className="flex flex-col items-center justify-center p-6 gap-4"
                style={{ background: '#0a0a0a' }}
              >
                <CrosshairPreview code={formData.code} size={160} />
                <div style={{ textAlign: 'center' }}>
                  <p className="text-xs" style={{ color: '#333333' }}>
                    {formData.code ? 'Preview en tiempo real' : 'Pegá un código para ver la mira'}
                  </p>
                  {formData.name && (
                    <p className="text-xs mt-1 font-medium" style={{ color: '#555555' }}>
                      {formData.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
