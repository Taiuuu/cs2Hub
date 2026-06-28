'use client';

import { Crosshair, CrosshairCvars } from '@/types';
import { FormEvent, useState } from 'react';
import { CrosshairPreview } from './CrosshairPreview';
import { Plus, X, Copy, Check } from 'lucide-react';

interface CrosshairFormProps {
  onAdd: (crosshair: Omit<Crosshair, 'id' | 'createdAt'>) => void;
}

const CVAR_KEYS: (keyof CrosshairCvars)[] = [
  'cl_crosshairsize', 'cl_crosshairgap', 'cl_crosshairthickness',
  'cl_crosshairdot', 'cl_crosshair_drawoutline', 'cl_crosshair_outlinethickness',
  'cl_crosshaircolor', 'cl_crosshaircolor_r', 'cl_crosshaircolor_g', 'cl_crosshaircolor_b',
  'cl_crosshairalpha', 'cl_crosshair_t',
];

function parseCvarsFromText(raw: string): CrosshairCvars {
  const result: Partial<CrosshairCvars> = {};
  const lines = raw.split(/[\n;]+/);
  for (const line of lines) {
    const match = line.trim().match(/^(cl_\w+)\s+"?([^"]+)"?$/);
    if (!match) continue;
    const [, key, val] = match;
    if (!CVAR_KEYS.includes(key as keyof CrosshairCvars)) continue;
    const k = key as keyof CrosshairCvars;
    if (val === 'true' || val === 'false') (result as any)[k] = val === 'true';
    else if (!isNaN(Number(val))) (result as any)[k] = Number(val);
  }
  return result as CrosshairCvars;
}

export function CrosshairForm({ onAdd }: CrosshairFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', description: '', cvarsRaw: '' });
  const [parsedCvars, setParsedCvars] = useState<CrosshairCvars | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  const handleCvarsChange = (raw: string) => {
    setFormData(f => ({ ...f, cvarsRaw: raw }));
    if (raw.trim()) {
      const parsed = parseCvarsFromText(raw);
      setParsedCvars(Object.keys(parsed).length > 0 ? parsed : undefined);
    } else {
      setParsedCvars(undefined);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onAdd({
      name: formData.name,
      code: formData.code,
      cvars: parsedCvars,
      description: formData.description || undefined,
    });
    setFormData({ name: '', code: '', description: '', cvarsRaw: '' });
    setParsedCvars(undefined);
    setIsOpen(false);
  };

  const handleCopy = async () => {
    if (!formData.code) return;
    await navigator.clipboard.writeText(formData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle: React.CSSProperties = {
    background: '#0a0a0a', border: '1px solid #2a2a2a',
    borderRadius: 8, color: '#ffffff', padding: '10px 14px',
    width: '100%', fontSize: 13, outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: '#444444', marginBottom: 6,
  };

  const canSave = formData.name.trim() && (formData.code.trim() || parsedCvars);

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{ background: 'rgba(255,85,0,0.08)', border: '1px solid #ff5500', color: '#ff5500', cursor: 'pointer' }}
        >
          <Plus className="w-4 h-4" /> Nueva mira
        </button>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: '#0d0d0d', border: '1px solid #1e1e1e' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #1a1a1a' }}>
            <span className="text-sm font-semibold" style={{ color: '#ffffff' }}>Nueva mira</span>
            <button type="button" onClick={() => { setIsOpen(false); setFormData({ name: '', code: '', description: '', cvarsRaw: '' }); setParsedCvars(undefined); }}
              style={{ color: '#444444', background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#444')}
            ><X className="w-4 h-4" /></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form */}
              <div className="p-5 space-y-4" style={{ borderRight: '1px solid #1a1a1a' }}>
                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input type="text" placeholder="ej: Mira competitiva" value={formData.name}
                    onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ff5500')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Código CSGO <span style={{ color: '#2a2a2a', textTransform: 'none' }}>— opcional</span></label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                      value={formData.code}
                      onChange={e => setFormData(f => ({ ...f, code: e.target.value }))}
                      style={{ ...inputStyle, fontFamily: 'monospace', color: '#ff5500', paddingRight: 40 }}
                      onFocus={e => (e.target.style.borderColor = '#ff5500')}
                      onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                    />
                    {formData.code && (
                      <button type="button" onClick={handleCopy}
                        style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#22c55e' : '#444' }}>
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Config de consola <span style={{ color: '#2a2a2a', textTransform: 'none' }}>— pegá los cvars</span></label>
                  <textarea
                    rows={5}
                    placeholder={`cl_crosshairsize "1.5"\ncl_crosshairgap "-2.2"\ncl_crosshairthickness "0.5"\ncl_crosshaircolor "5"\ncl_crosshairdot "false"`}
                    value={formData.cvarsRaw}
                    onChange={e => handleCvarsChange(e.target.value)}
                    style={{ ...inputStyle, fontFamily: 'monospace', fontSize: 12, resize: 'vertical', color: parsedCvars ? '#aaaaaa' : '#555555' }}
                    onFocus={e => (e.target.style.borderColor = '#ff5500')}
                    onBlur={e => (e.target.style.borderColor = parsedCvars ? '#ff550055' : '#2a2a2a')}
                  />
                  {parsedCvars && (
                    <p className="text-xs mt-1" style={{ color: '#ff5500' }}>
                      ✓ {Object.keys(parsedCvars).length} cvars detectados — preview actualizado
                    </p>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>Descripción <span style={{ color: '#2a2a2a', textTransform: 'none' }}>— opcional</span></label>
                  <input type="text" placeholder="ej: Para retakes, baja sens"
                    value={formData.description}
                    onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#ff5500')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                  />
                </div>

                <button type="submit" disabled={!canSave}
                  style={{
                    width: '100%', padding: '10px', borderRadius: 8, border: 'none',
                    background: canSave ? '#ff5500' : '#1a1a1a',
                    color: canSave ? '#fff' : '#333',
                    fontWeight: 600, fontSize: 13,
                    cursor: canSave ? 'pointer' : 'not-allowed',
                  }}>
                  Guardar mira
                </button>
              </div>

              {/* Preview */}
              <div className="flex flex-col items-center justify-center p-6 gap-3" style={{ background: '#0a0a0a' }}>
                <CrosshairPreview cvars={parsedCvars} size={180} />
                <p className="text-xs text-center" style={{ color: parsedCvars ? '#555' : '#2a2a2a' }}>
                  {parsedCvars ? 'Preview en tiempo real' : 'Pegá los cvars para ver la mira'}
                </p>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
