'use client';

import { useEffect, useRef } from 'react';

interface CrosshairPreviewProps {
  code: string;
  name?: string;
}

export function CrosshairPreview({ code, name }: CrosshairPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensiones del canvas
    const width = 512;
    const height = 512;
    canvas.width = width;
    canvas.height = height;

    // Dibujar fondo (similar al juego)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Centro del canvas
    const centerX = width / 2;
    const centerY = height / 2;

    // Parsear código de la mira (formato CS2)
    // El formato es normalmente: CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
    // Pero también soporta el formato antiguo de números

    try {
      // Dibujar la mira con valores por defecto si no hay código válido
      drawCrosshair(ctx, centerX, centerY, code || '');
    } catch (error) {
      console.error('Error dibujando mira:', error);
      // Dibujar mira por defecto
      drawDefaultCrosshair(ctx, centerX, centerY);
    }

    // Dibujar nombre si existe
    if (name) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(name, centerX, height - 20);
    }
  }, [code, name]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative rounded-lg border border-zinc-700 overflow-hidden bg-zinc-900 p-4">
        <canvas
          ref={canvasRef}
          className="border border-zinc-600 rounded"
          width={512}
          height={512}
        />
      </div>
      <p className="text-xs text-zinc-400 text-center max-w-xs">
        Vista previa de cómo se vería tu mira en el juego. Código: <code className="text-blue-400">{code || 'ninguno'}</code>
      </p>
    </div>
  );
}

/**
 * Dibuja la mira basada en el código
 */
function drawCrosshair(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, code: string) {
  // Colores de mira
  const color = '#00ff00'; // Verde típico de CS
  const outlineColor = '#000000';
  const lineWidth = 2;

  // Parámetros de la mira (con valores por defecto)
  const params = parseXhairCode(code);

  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = lineWidth + 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Línea superior
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - params.gap);
  ctx.lineTo(centerX, centerY - params.gap - params.outlineLength);
  ctx.stroke();

  // Línea inferior
  ctx.beginPath();
  ctx.moveTo(centerX, centerY + params.gap);
  ctx.lineTo(centerX, centerY + params.gap + params.outlineLength);
  ctx.stroke();

  // Línea izquierda
  ctx.beginPath();
  ctx.moveTo(centerX - params.gap, centerY);
  ctx.lineTo(centerX - params.gap - params.outlineLength, centerY);
  ctx.stroke();

  // Línea derecha
  ctx.beginPath();
  ctx.moveTo(centerX + params.gap, centerY);
  ctx.lineTo(centerX + params.gap + params.outlineLength, centerY);
  ctx.stroke();

  // Dibujar en verde
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // Línea superior
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - params.gap);
  ctx.lineTo(centerX, centerY - params.gap - params.length);
  ctx.stroke();

  // Línea inferior
  ctx.beginPath();
  ctx.moveTo(centerX, centerY + params.gap);
  ctx.lineTo(centerX, centerY + params.gap + params.length);
  ctx.stroke();

  // Línea izquierda
  ctx.beginPath();
  ctx.moveTo(centerX - params.gap, centerY);
  ctx.lineTo(centerX - params.gap - params.length, centerY);
  ctx.stroke();

  // Línea derecha
  ctx.beginPath();
  ctx.moveTo(centerX + params.gap, centerY);
  ctx.lineTo(centerX + params.gap + params.length, centerY);
  ctx.stroke();

  // Punto central (dot)
  if (params.dot) {
    ctx.fillStyle = outlineColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, params.dotSize + 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, params.dotSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Dibuja una mira por defecto
 */
function drawDefaultCrosshair(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
  const color = '#00ff00';
  const outlineColor = '#000000';
  const length = 20;
  const gap = 5;
  const lineWidth = 2;

  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = lineWidth + 2;
  ctx.lineCap = 'round';

  // Línea superior
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - gap);
  ctx.lineTo(centerX, centerY - gap - length);
  ctx.stroke();

  // Línea inferior
  ctx.beginPath();
  ctx.moveTo(centerX, centerY + gap);
  ctx.lineTo(centerX, centerY + gap + length);
  ctx.stroke();

  // Línea izquierda
  ctx.beginPath();
  ctx.moveTo(centerX - gap, centerY);
  ctx.lineTo(centerX - gap - length, centerY);
  ctx.stroke();

  // Línea derecha
  ctx.beginPath();
  ctx.moveTo(centerX + gap, centerY);
  ctx.lineTo(centerX + gap + length, centerY);
  ctx.stroke();

  // Verde
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // Línea superior
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - gap);
  ctx.lineTo(centerX, centerY - gap - length);
  ctx.stroke();

  // Línea inferior
  ctx.beginPath();
  ctx.moveTo(centerX, centerY + gap);
  ctx.lineTo(centerX, centerY + gap + length);
  ctx.stroke();

  // Línea izquierda
  ctx.beginPath();
  ctx.moveTo(centerX - gap, centerY);
  ctx.lineTo(centerX - gap - length, centerY);
  ctx.stroke();

  // Línea derecha
  ctx.beginPath();
  ctx.moveTo(centerX + gap, centerY);
  ctx.lineTo(centerX + gap + length, centerY);
  ctx.stroke();

  // Punto central
  ctx.fillStyle = outlineColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Parsea el código de mira CS2
 * Si el código es válido, extrae parámetros. Si no, retorna valores por defecto.
 */
function parseXhairCode(code: string) {
  // Valores por defecto
  const defaults = {
    length: 8,
    gap: 3,
    outlineLength: 10,
    outlineGap: 4,
    dot: true,
    dotSize: 2,
  };

  if (!code || code.trim() === '') {
    return defaults;
  }

  // Para simplificar, usamos valores ajustados manualmente
  // En un caso real, estos vendrían del parsing del código completo
  try {
    // Si contiene números, intentar extraer parámetros
    const nums = code.match(/\d+/g);
    if (nums && nums.length >= 2) {
      return {
        length: Math.min(Math.max(parseInt(nums[0]) || 8, 3), 20),
        gap: Math.min(Math.max(parseInt(nums[1]) || 3, 0), 15),
        outlineLength: 10,
        outlineGap: 4,
        dot: true,
        dotSize: 2,
      };
    }
  } catch (e) {
    // Si hay error, usar defaults
  }

  return defaults;
}
