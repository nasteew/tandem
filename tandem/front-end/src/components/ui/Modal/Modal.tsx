import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export const Modal = ({ open, onClose, title, children, showCloseButton = true }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 ${styles.backdrop}`}
    >
      <div
        className={`${styles.content} bg-[var(--glass-bg)] border border-[var(--color-border-light)] bg-opacity-50 backdrop-blur-md p-6 rounded-xl w-full max-w-md relative`}
      >
        {title && (
          <h2 className="text-lg font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-400 mb-4">
            {title}
          </h2>
        )}

        {children}

        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-2 right-5 text-white text-lg font-bold hover:text-gray-300 cursor-pointer"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
