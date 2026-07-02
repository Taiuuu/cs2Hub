'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-default)] border transition-all duration-[var(--transition-default)] ease-[var(--transition-default)] shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-default)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)] active:scale-[0.98]';
  const variantClasses =
    variant === 'primary'
      ? 'border-[1px] border-[var(--color-border-subtle)] bg-[var(--color-accent-default)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-md)]'
      : variant === 'secondary'
      ? 'border-[1px] border-[var(--color-border-subtle)] bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-accent-muted)] hover:text-white hover:shadow-[var(--shadow-md)]'
      : 'border-transparent bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-bg-card)] hover:shadow-[var(--shadow-md)]';
  const sizeClasses =
    size === 'sm'
      ? 'px-3 py-2 text-sm'
      : size === 'lg'
      ? 'px-5 py-3 text-base'
      : 'px-4 py-2.5 text-sm';
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '';

  return (
    <button
      className={`${base} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
