import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button/Button';
import { toast } from 'react-hot-toast';

interface ChangeAvatarModalProps {
  open: boolean;
  onClose: () => void;
}

export const ChangeAvatarModal = ({ open, onClose }: ChangeAvatarModalProps) => (
  <Modal open={open} onClose={onClose} title="Change Avatar">
    <label className="block w-full mb-4">
      <span className="sr-only">Choose avatar</span>
      <input type="file" accept="image/*" className="hidden" />
      <div className="cursor-pointer w-full py-2 text-center border border-[var(--color-border-light)] rounded-lg bg-white/5 text-white hover:bg-white/10 transition">
        Choose avatar
      </div>
    </label>
    <div className="flex justify-end gap-3">
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          toast.success('Avatar changed');
          onClose();
        }}
      >
        Save
      </Button>
    </div>
  </Modal>
);
