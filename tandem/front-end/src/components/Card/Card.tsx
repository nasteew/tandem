import { type ReactNode } from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps {
  children?: ReactNode;
  className?: string;
  header?: ReactNode;
  icon?: ReactNode;
  title?: string;
  description?: string;
}

export const Card = ({ children, className, header, icon, title, description }: CardProps) => {
  if (header) {
    return (
      <div className={clsx(styles.card, className)}>
        {header}
        {children}
      </div>
    );
  }

  if (icon && title) {
    return (
      <div className={clsx(styles.card, className)}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>{icon}</div>
          <h3 className={styles.title}>{title}</h3>
        </div>
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    );
  }

  return <div className={clsx(styles.card, className)}>{children}</div>;
};
