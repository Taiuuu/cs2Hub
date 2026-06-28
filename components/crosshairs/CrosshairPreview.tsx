'use client';

import { useEffect, useRef } from 'react';
import { CrosshairCvars } from '@/types';

interface CrosshairPreviewProps {
  code?: string;
  cvars?: CrosshairCvars;
  size?: number;
}

// Colores estándar de CS2 (cl_crosshaircolor 0-5)
const CS2_COLORS: Record<number, [number, number, number]> = {
  0: [255, 0,   0],   // rojo
  1: [0,   255, 0],   // verde
  2: [255, 255, 0],   // amarillo
  3: [0,   0,   255], // azul
  4: [0,   255, 255], // cyan
  5: [255, 255, 255], // blanco (custom rgb)
};

function cvarsToParams(cvars: CrosshairCvars) {
  const colorIndex = cvars.cl_crosshaircolor ?? 1;
  let [r, g, b] = CS2_COLORS[colorIndex] ?? CS2_COLORS[1];

  // Si es color 5 (custom) y tiene RGB, usarlos
  if (colorIndex === 5 && cvars.cl_crosshaircolor_r !== undefined) {
    r = cvars.cl_crosshaircolor_r ?? 255;
    g = cvars.cl_crosshaircolor_g ?? 255;
    b = cvars.cl_crosshaircolor_b ?? 255;
  }

  const alpha = ((cvars.cl_crosshairalpha ?? 255) / 255);
  const color = `rgba(${r},${g},${b},${alpha})`;

  return {
    size:      cvars.cl_crosshairsize      ?? 5,
    gap:       cvars.cl_crosshairgap       ?? 1,
    thickness: cvars.cl_crosshairthickness ?? 0.5,
    dot:       cvars.cl_crosshairdot       ?? false,
    outline:   cvars.cl_crosshair_drawoutline ?? false,
    outlineThickness: cvars.cl_crosshair_outlinethickness ?? 1,
    tStyle:    cvars.cl_crosshair_t        ?? false,
    color,
    outlineColor: `rgba(0,0,0,${alpha})`,
  };
}

function defaultParams() {
  return {
    size: 5, gap: 1, thickness: 1,
    dot: false, outline: false, outlineThickness: 1,
    tStyle: false,
    color: '#00ff00', outlineColor: 'rgba(0,0,0,0.8)',
  };
}

export function CrosshairPreview({ code, cvars, size = 200 }: CrosshairPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    // Fondo oscuro con grid sutil
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = '#1c1c1c';
    ctx.lineWidth = 0.5;
    const step = size / 8;
    for (let x = 0; x <= size; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke();
    }
    for (let y = 0; y <= size; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke();
    }

    const cx = size / 2;
    const cy = size / 2;

    // Escala: CS2 usa unidades de pixel a 1080p aprox.
    // Referencia: size=5, gap=1, thickness=0.5 → mira típica de pro
    const UNIT = size / 40; // factor de escala

    const p = cvars ? cvarsToParams(cvars) : defaultParams();

    const len   = p.size * UNIT;
    const gap   = p.gap  * UNIT;
    const thick = Math.max(1, p.thickness * UNIT * 2);
    const outW  = thick + p.outlineThickness * UNIT * 2;

    const drawLine = (x1: number, y1: number, x2: number, y2: number, lw: number, style: string) => {
      ctx.save();
      ctx.strokeStyle = style;
      ctx.lineWidth = lw;
      ctx.lineCap = 'square';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    const lines: [number, number, number, number][] = [
      [cx,       cy - gap - len, cx,       cy - gap      ], // top
      [cx,       cy + gap,       cx,       cy + gap + len ], // bottom
      [cx - gap - len, cy,       cx - gap, cy             ], // left
      [cx + gap, cy,             cx + gap + len, cy       ], // right
    ];

    // Si es T-style, omitir línea de arriba
    const activeLines = p.tStyle ? lines.slice(1) : lines;

    // Outline
    if (p.outline) {
      activeLines.forEach(([x1, y1, x2, y2]) => drawLine(x1, y1, x2, y2, outW, p.outlineColor));
    }

    // Líneas principales
    activeLines.forEach(([x1, y1, x2, y2]) => drawLine(x1, y1, x2, y2, thick, p.color));

    // Dot
    if (p.dot) {
      const dotR = Math.max(1, thick / 2);
      if (p.outline) {
        ctx.fillStyle = p.outlineColor;
        ctx.beginPath();
        ctx.arc(cx, cy, dotR + p.outlineThickness * UNIT, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [cvars, code, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block', borderRadius: 6 }}
    />
  );
}
