import React from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  header,
  icon,
  title,
  description,
}) => {
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
