import { Modal } from '../../../../components/ui/Modal/Modal';
import { Input } from '../../../../components/ui/Input/Input';
import { Button } from '../../../../components/ui/Button/Button';
import type { UpdatePassword } from '@/types/UpdatePassword';
import { useState } from 'react';
import { usePasswordValidation } from '../../../../hooks/profile/useProfileValidation';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (passwords: UpdatePassword, onSuccess?: () => void) => void;
  hasPassword: boolean | undefined;
}

export const ChangePasswordModal = ({
  open,
  onClose,
  onSave,
  hasPassword,
}: ChangePasswordModalProps) => {
  const { t } = useTranslation('profile');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    error: oldPasswordError,
    validatePassword: validateOldPassword,
    resetError: resetOldError,
  } = usePasswordValidation();
  const {
    error: newPasswordError,
    validatePassword: validateNewPassword,
    hasError,
    resetError: resetNewError,
  } = usePasswordValidation();

  const isDisabled =
    (hasPassword && oldPassword.trim() === '') ||
    newPassword.trim() === '' ||
    hasError ||
    !!oldPasswordError;

  const handleSave = () => {
    onSave(hasPassword ? { oldPassword, newPassword } : { newPassword }, () => {
      resetAll();
      onClose();
    });
  };

  const resetAll = () => {
    setOldPassword('');
    setNewPassword('');
    resetOldError();
    resetNewError();
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={hasPassword ? t('password.titleChange') : t('password.titleSet')}
    >
      {hasPassword && (
        <div className="mb-3">
          <div className="relative">
            <Input
              type={showOldPassword ? 'text' : 'password'}
              placeholder={t('password.phOld')}
              value={oldPassword}
              onChange={(e) => {
                const value = e.target.value;
                setOldPassword(value);
                validateOldPassword(value);
              }}
              className="pr-10"
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="min-h-[16px] mt-1">
            {oldPasswordError && <p className="ml-2 text-red-400 text-xs">{oldPasswordError}</p>}
          </div>
        </div>
      )}

      <div className="mb-1">
        <div className="relative">
          <Input
            type={showNewPassword ? 'text' : 'password'}
            placeholder={hasPassword ? t('password.phNew') : t('password.phCreate')}
            value={newPassword}
            onChange={(e) => {
              const value = e.target.value;
              setNewPassword(value);
              validateNewPassword(value);
            }}
            className="pr-10"
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="min-h-[16px] mt-1">
          {newPasswordError && <p className="ml-2 text-red-400 text-xs">{newPasswordError}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="ghost" onClick={handleClose}>
          {t('password.btnCancel')}
        </Button>

        <Button variant="primary" disabled={isDisabled} onClick={handleSave}>
          {t('password.btnSave')}
        </Button>
      </div>
    </Modal>
  );
};
