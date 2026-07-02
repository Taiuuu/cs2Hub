'use client';

import { ChevronDown } from 'lucide-react';
import React from 'react';

export interface FieldDef {
  key: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'boolean';
  unit?: string;
  options?: string[];
  placeholder?: string;
}

export interface SectionDefProps {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  fields: FieldDef[];
}

interface ConfigSectionProps {
  section: SectionDefProps;
  isEnabled: boolean;
  isOpen: boolean;
  accentClasses: { bg: string; text: string; border: string; ring: string };
  onToggleEnable: (enabled: boolean) => void;
  onToggleOpen: () => void;
  onFieldChange: (fieldKey: string, value: string | number | boolean) => void;
  fieldValues: Record<string, string | number | boolean>;
}

export function ConfigSection({
  section,
  isEnabled,
  isOpen,
  accentClasses,
  onToggleEnable,
  onToggleOpen,
  onFieldChange,
  fieldValues,
}: ConfigSectionProps) {
  const Icon = section.icon;

  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{
        border: `1px solid ${isEnabled ? '#2a2a2a' : '#1a1a1a'}`,
        background: isEnabled ? '#111111' : '#0a0a0a',
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <button
          type="button"
          disabled={!isEnabled}
          onClick={onToggleOpen}
          className="flex flex-1 items-center gap-3 text-left"
          style={{
            background: 'none',
            border: 'none',
            cursor: isEnabled ? 'pointer' : 'default',
            padding: 0,
          }}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              isEnabled ? accentClasses.bg : ''
            }`}
            style={!isEnabled ? { background: '#1a1a1a' } : {}}
          >
            <Icon
              className={`h-4 w-4 ${
                isEnabled ? accentClasses.text : 'text-[#333333]'
              }`}
            />
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: isEnabled ? '#ffffff' : '#444444' }}
          >
            {section.label}
          </span>
          {isEnabled && (
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
              style={{ color: '#444444' }}
            />
          )}
        </button>

        {/* Toggle */}
        <label className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => onToggleEnable(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className="absolute inset-0 rounded-full transition"
            style={{ background: isEnabled ? '#ff5500' : '#2a2a2a' }}
          />
          <span
            className="absolute left-0.5 h-5 w-5 rounded-full bg-white transition"
            style={{
              transform: isEnabled ? 'translateX(20px)' : 'translateX(0)',
            }}
          />
        </label>
      </div>

      {isEnabled && isOpen && (
        <div
          className="grid gap-3 px-4 py-4 sm:grid-cols-2"
          style={{ borderTop: '1px solid #1a1a1a' }}
        >
          {section.fields.map((field) => {
            const value = fieldValues[field.key] ?? '';

            if (field.type === 'boolean') {
              return (
                <label
                  key={field.key}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5"
                  style={{
                    background: '#0d0d0d',
                    border: '1px solid #1e1e1e',
                  }}
                >
                  <span className="text-sm" style={{ color: '#aaaaaa' }}>
                    {field.label}
                  </span>
                  <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) =>
                      onFieldChange(field.key, e.target.checked)
                    }
                    className="h-4 w-4 rounded"
                    style={{ accentColor: '#ff5500' }}
                  />
                </label>
              );
            }

            if (field.type === 'select') {
              return (
                <div key={field.key}>
                  <label
                    className="block text-xs mb-1"
                    style={{ color: '#444444' }}
                  >
                    {field.label}
                  </label>
                  <select
                    value={String(value)}
                    onChange={(e) => onFieldChange(field.key, e.target.value)}
                    className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none ${accentClasses.ring}`}
                    style={{
                      background: '#0d0d0d',
                      border: '1px solid #2a2a2a',
                      color: '#ffffff',
                    }}
                  >
                    <option value="">— Sin definir —</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            return (
              <div key={field.key}>
                <label
                  className="block text-xs mb-1"
                  style={{ color: '#444444' }}
                >
                  {field.label}
                  {field.unit ? ` (${field.unit})` : ''}
                </label>
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  step="any"
                  value={String(value)}
                  onChange={(e) => onFieldChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none ${accentClasses.ring}`}
                  style={{
                    background: '#0d0d0d',
                    border: '1px solid #2a2a2a',
                    color: '#ffffff',
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
