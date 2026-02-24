import { type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  iconPosition?: 'left' | 'right' | 'only';
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconPosition,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        iconPosition === 'left' && styles.iconLeft,
        iconPosition === 'right' && styles.iconRight,
        iconPosition === 'only' && styles.iconOnly,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
