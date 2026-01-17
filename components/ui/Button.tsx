'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-lg
      transition-all duration-200 ease-out
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-offset-2
    `;

    const variants = {
      primary: `
        bg-primary-500 text-white
        hover:bg-primary-600 active:bg-primary-700
        focus:ring-primary-500
        shadow-sm hover:shadow-md
      `,
      secondary: `
        bg-white text-dark border border-dark
        hover:bg-surface active:bg-gray-100
        focus:ring-dark
      `,
      outline: `
        bg-transparent text-dark border border-gray-300
        hover:bg-gray-50 active:bg-gray-100
        focus:ring-gray-300
      `,
      ghost: `
        text-dark bg-transparent
        hover:bg-surface active:bg-gray-100
        focus:ring-dark
      `,
      danger: `
        bg-red-500 text-white
        hover:bg-red-600 active:bg-red-700
        focus:ring-red-500
        shadow-sm hover:shadow-md
      `,
      link: `
        text-primary-500 bg-transparent underline-offset-4
        hover:underline focus:ring-primary-500
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
