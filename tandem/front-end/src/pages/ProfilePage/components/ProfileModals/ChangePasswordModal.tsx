import { Modal } from '../../../../components/ui/Modal/Modal';
import { Input } from '../../../../components/ui/Input/Input';
import { Button } from '../../../../components/ui/Button/Button';
import type { UpdatePassword } from '@/types/UpdatePassword';
import { useState } from 'react';
import { usePasswordValidation } from '../../../../hooks/profile/useProfileValidation';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (passwords: UpdatePassword) => void;
  hasPassword: boolean | undefined;
}

export const ChangePasswordModal = ({
  open,
  onClose,
  onSave,
  hasPassword,
}: ChangePasswordModalProps) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { error, validatePassword, hasError } = usePasswordValidation();

  const isDisabled =
    (hasPassword && oldPassword.trim() === '') || newPassword.trim() === '' || hasError;

  const handleSave = () => {
    if (hasPassword) {
      onSave({ oldPassword, newPassword });
    } else {
      onSave({ newPassword });
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={hasPassword ? 'Change Password' : 'Set Password'}>
      {hasPassword && (
        <Input
          type="password"
          placeholder="Old password"
          className="mb-3"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      )}

      <Input
        type="password"
        placeholder={hasPassword ? 'New password' : 'Create password'}
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

        <Button variant="primary" disabled={isDisabled} onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};
