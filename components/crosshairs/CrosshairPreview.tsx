'use client';

import { useEffect, useRef } from 'react';

interface CrosshairPreviewProps {
  code: string;
  name?: string;
  size?: number; // px, default 200
}

export function CrosshairPreview({ code, name, size = 200 }: CrosshairPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = size;
    const H = size;
    canvas.width = W;
    canvas.height = H;

    // Fondo oscuro estilo CS2
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, W, H);

    // Grid sutil
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 0.5;
    const step = W / 8;
    for (let x = 0; x <= W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y <= H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    const cx = W / 2;
    const cy = H / 2;
    const scale = W / 200;

    const params = parseCode(code);
    const color = params.color;
    const outlineColor = '#000000';

    const len = params.length * scale;
    const gap = params.gap * scale;
    const thick = params.thickness * scale;
    const outline = Math.max(1, thick * 0.6);

    const drawLine = (x1: number, y1: number, x2: number, y2: number, lw: number, style: string) => {
      ctx.strokeStyle = style;
      ctx.lineWidth = lw;
      ctx.lineCap = 'square';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    // Outline primero
    if (params.outline) {
      drawLine(cx, cy - gap - len, cx, cy - gap, thick + outline * 2, outlineColor);
      drawLine(cx, cy + gap, cx, cy + gap + len, thick + outline * 2, outlineColor);
      drawLine(cx - gap - len, cy, cx - gap, cy, thick + outline * 2, outlineColor);
      drawLine(cx + gap, cy, cx + gap + len, cy, thick + outline * 2, outlineColor);
    }

    // Líneas de la mira
    drawLine(cx, cy - gap - len, cx, cy - gap, thick, color);
    drawLine(cx, cy + gap, cx, cy + gap + len, thick, color);
    drawLine(cx - gap - len, cy, cx - gap, cy, thick, color);
    drawLine(cx + gap, cy, cx + gap + len, cy, thick, color);

    // Dot central
    if (params.dot) {
      const dotR = params.dotSize * scale;
      if (params.outline) {
        ctx.fillStyle = outlineColor;
        ctx.beginPath();
        ctx.arc(cx, cy, dotR + outline, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [code, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block', borderRadius: 6 }}
    />
  );
}

// Colores basados en el código
const COLOR_MAP: Record<string, string> = {
  '0': '#00ff00',
  '1': '#00ff00',
  '2': '#ffff00',
  '3': '#0000ff',
  '4': '#00ffff',
  '5': '#ffffff',
  '6': '#ff5500',
  '7': '#ff0000',
  '8': '#ff00ff',
};

function parseCode(code: string) {
  const defaults = {
    length: 8, gap: 3, thickness: 2,
    dot: false, dotSize: 2,
    outline: true, color: '#00ff00',
  };

  if (!code || code.trim() === '') return defaults;

  try {
    const nums = code.replace(/CSGO-/i, '').match(/\d+/g) || [];
    const colorKey = nums[3] || '1';
    const color = COLOR_MAP[colorKey] || '#00ff00';

    return {
      length: Math.min(Math.max(parseInt(nums[0]) || 8, 2), 22),
      gap: Math.min(Math.max(parseInt(nums[1]) || 3, 0), 12),
      thickness: Math.min(Math.max(parseInt(nums[2]) || 2, 1), 5),
      dot: parseInt(nums[4]) === 1,
      dotSize: Math.min(Math.max(parseInt(nums[5]) || 2, 1), 4),
      outline: parseInt(nums[6]) !== 0,
      color,
    };
  } catch {
    return defaults;
  }
}
