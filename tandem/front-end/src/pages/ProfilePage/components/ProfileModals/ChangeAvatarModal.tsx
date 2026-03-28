import { useState } from 'react';
import { Modal } from '../../../../components/ui/Modal/Modal';
import { Button } from '../../../../components/ui/Button/Button';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface ChangeAvatarModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
}

export const ChangeAvatarModal = ({ open, onClose, onSave }: ChangeAvatarModalProps) => {
  const { t } = useTranslation('profile');
  const [file, setFile] = useState<File | null>(null);

  return (
    <Modal open={open} onClose={onClose} title={t('avatar.title')}>
      <label className="block w-full mb-4">
        <span className="sr-only">{t('avatar.choose')}</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <div className="cursor-pointer w-full py-2 text-center border border-[var(--color-border-light)] rounded-lg bg-white/5 text-white hover:bg-white/10 transition">
          {file ? file.name : t('avatar.choose')}
        </div>
      </label>

      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>
          {t('avatar.btnCancel')}
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            if (!file) {
              toast.error(t('avatar.chooseError'));
              return;
            }
            onSave(file);
          }}
        >
          {t('avatar.btnSave')}
        </Button>
      </div>
    </Modal>
  );
};
