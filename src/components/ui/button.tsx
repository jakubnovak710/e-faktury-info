import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default:
          'rounded-xl text-white hover:scale-105',
        ghost:
          'rounded-xl hover:scale-[1.02]',
        outline:
          'rounded-xl hover:scale-[1.02]',
        glass:
          'rounded-xl hover:scale-[1.02]',
        link: 'underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function getVariantStyles(variant: string | null | undefined): React.CSSProperties {
  switch (variant) {
    case 'default':
      return {
        background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
        boxShadow: '0 0 20px var(--accent-glow)',
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-default)',
      };
    case 'glass':
      return {
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid var(--border-default)',
        color: 'var(--text-primary)',
      };
    case 'link':
      return { color: 'var(--accent)' };
    default:
      return {};
  }
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ ...getVariantStyles(variant), ...style }}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
