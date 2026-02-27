import { Modal } from '@/components/ui/Modal/Modal';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { toast } from 'react-hot-toast';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({ open, onClose }: ChangePasswordModalProps) => (
  <Modal open={open} onClose={onClose} title="Change Password">
    <Input type="password" placeholder="New password" className="mb-3" />
    <Input type="password" placeholder="Confirm password" className="mb-4" />
    <div className="flex justify-end gap-3">
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          toast.success('Password changed');
          onClose();
        }}
      >
        Save
      </Button>
    </div>
  </Modal>
);
