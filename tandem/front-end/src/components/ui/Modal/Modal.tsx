import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[var(--glass-bg)] border border-[var(--color-border-light)] bg-opacity-50 backdrop-blur-md p-6 rounded-xl w-full max-w-md relative">
        {title && (
          <h2 className="text-lg font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-400 mb-4">
            {title}
          </h2>
        )}
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-5 text-white text-lg font-bold hover:text-gray-300 cursor-pointer"
        >
          ×
        </button>
      </div>
    </div>
  );
};
