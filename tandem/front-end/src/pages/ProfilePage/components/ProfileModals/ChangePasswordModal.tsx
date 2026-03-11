import { Modal } from '../../../../components/ui/Modal/Modal';
import { Input } from '../../../../components/ui/Input/Input';
import { Button } from '../../../../components/ui/Button/Button';
import type { UpdatePassword } from '@/types/UpdatePassword';
import { useState } from 'react';
import { usePasswordValidation } from '../../../../hooks/useProfileValidation';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (passwords: UpdatePassword) => void;
}

export const ChangePasswordModal = ({ open, onClose, onSave }: ChangePasswordModalProps) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { error, validatePassword, hasError } = usePasswordValidation();

  const isDisabled = oldPassword.trim() === '' || newPassword.trim() === '' || hasError;

  return (
    <Modal open={open} onClose={onClose} title="Change Password">
      <Input
        type="password"
        placeholder="Old password"
        className="mb-3"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <Input
        type="password"
        placeholder="New password"
        className="mb-1"
        value={newPassword}
        onChange={(e) => {
          const value = e.target.value;
          setNewPassword(value);
          validatePassword(value);
        }}
      />

      <div className="h-1">{error && <p className="text-red-400 text-xs mb-3">{error}</p>}</div>

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="primary"
          disabled={isDisabled}
          onClick={() => onSave({ oldPassword, newPassword })}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};
