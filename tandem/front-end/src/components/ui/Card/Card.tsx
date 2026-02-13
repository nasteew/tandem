import React from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className }) => {
  return (
    <div className={clsx(styles.card, className)}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
