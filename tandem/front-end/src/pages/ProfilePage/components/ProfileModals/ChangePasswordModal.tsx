import { Modal } from '@/components/ui/Modal/Modal';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import type { UpdatePassword } from '@/types/UpdatePassword';
import { useState } from 'react';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (passwords: UpdatePassword) => void;
}

export const ChangePasswordModal = ({ open, onClose, onSave }: ChangePasswordModalProps) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const isDisabled = oldPassword.trim() === '' || newPassword.trim() === '';

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
        className="mb-4"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSave({ oldPassword, newPassword });
          }}
          disabled={isDisabled}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};
