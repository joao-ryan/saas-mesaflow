import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'error' | 'neutral' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const variants: Record<string, string> = {
    default: 'bg-neutral-800 text-white hover:bg-neutral-700',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    outline: 'text-neutral-500 border border-neutral-200',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    neutral: 'bg-neutral-500/20 text-neutral-400 border border-neutral-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${selectedVariant} ${className}`}>
      {children}
    </span>
  );
};
