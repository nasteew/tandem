import { useState } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { SectionCard } from '../../components/SectionCard/SectionCard';
import { Field } from '../../components/Field/Field';
import { ProfileHeader } from './components/ProfileHeader';
import { ChangePasswordModal } from './components/ProfileModals/ChangePasswordModal';
import { ChangeAvatarModal } from './components/ProfileModals/ChangeAvatarModal';
import {
  useDeleteProfile,
  useProfile,
  useUpdatePassword,
  useUpdateProfile,
  useUploadAvatar,
} from '../../hooks/profile/useProfile';
import type { UserProfile } from '@/types/UserProfile';
import type { UpdatePassword } from '@/types/UpdatePassword';
import { LoadingScreen } from '../../components/Loading/Loading';
import { useAuthStore } from '../../store/authStore';
import { useProfileValidation } from '../../hooks/profile/useProfileValidation';
import { ErrorBlock } from '@/components/ErrorComponent/ErrorComponent';
import { useUserStats } from '@/hooks/dashboard/useDashboard';
import { queryClient } from '@/config/queryClient';
import { useTranslation } from 'react-i18next';

export const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const { data: profileData, isLoading, error: profileError } = useProfile(userId);
  const updateProfile = useUpdateProfile(userId);
  const deleteProfile = useDeleteProfile(userId);
  const updatePassword = useUpdatePassword(userId);
  const updateAvatar = useUploadAvatar(userId);
  const { data: stats, isLoading: statsLoading, error: statsError } = useUserStats();

  const profile = profileData;
  const hasPassword = profile?.hasPassword ?? true;

  const [draft, setDraft] = useState<UserProfile | null>(null);

  const [editFields, setEditFields] = useState({
    name: false,
    email: false,
    about: false,
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleSavePassword = (passwords: UpdatePassword) => {
    updatePassword.mutate(passwords, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['profile', userId],
        });
        setIsPasswordModalOpen(false);
      },
    });
  };

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const { errors, validateField, hasErrors, resetAllErrors } = useProfileValidation();

  if (profileError || statsError) {
    return <ErrorBlock message={profileError?.message || statsError?.message} />;
  }

  if (isLoading || statsLoading || !profile || !stats) {
    return <LoadingScreen />;
  }

  const current = draft ?? profile;

  const startEditing = (field: keyof typeof editFields) => {
    setEditFields((prev) => ({ ...prev, [field]: true }));
    setDraft((prev) => prev ?? current);
  };

  const cancelEditing = (field: keyof typeof editFields) => {
    const updated = { ...editFields, [field]: false };
    setEditFields(updated);
    const isAnyEditing = Object.values(updated).some(Boolean);
    if (!isAnyEditing) {
      setDraft(null);
      resetAllErrors();
    }
  };

  const handleSaveProfile = () => {
    if (!draft) return;
    const changed: Partial<UserProfile> = {};
    if (draft.name !== profile.name) changed.name = draft.name;
    if (draft.email !== profile.email) changed.email = draft.email;
    if (draft.about !== profile.about) changed.about = draft.about;

    updateProfile.mutate(changed, {
      onSuccess: () => {
        setEditFields({ name: false, email: false, about: false });
        setDraft(null);
        queryClient.invalidateQueries({ queryKey: ['global-stats'] });
      },
    });
  };

  const handleDeleteProfile = () => {
    deleteProfile.mutate();
  };

  return (
    <div>
      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handleSavePassword}
        hasPassword={hasPassword}
      />
      <ChangeAvatarModal
        open={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSave={(file: File) => {
          updateAvatar.mutate(file, { onSuccess: () => setIsAvatarModalOpen(false) });
        }}
      />

      <div className="px-6 pt-10 flex justify-center bg-[radial-gradient(circle_at_20%_30%,var(--color-bg-light),var(--color-bg-dark))]">
        <div className="w-full max-w-5xl space-y-6">
          <ProfileHeader
            name={current.name}
            email={current.email}
            about={current.about ?? ''}
            avatarUrl={current.avatarUrl}
            onAvatarClick={() => setIsAvatarModalOpen(true)}
            stats={[
              {
                label: t('bestLevelTime'),
                value: `${stats.bestTime.minutes
                  .toString()
                  .padStart(2, '0')}:${stats.bestTime.seconds.toString().padStart(2, '0')}`,
              },
              { label: t('completedLevels'), value: stats.levelsCompleted },
            ]}
          />

          <main className="grid md:grid-cols-2 gap-6">
            <SectionCard title={t('personalInfoTitle')}>
              <Field
                label={t('lblName')}
                value={current.name}
                editing={editFields.name}
                error={errors.name}
                editLabel={t('btnEdit')}
                cancelLabel={t('btnCancel')}
                onEdit={() => startEditing('name')}
                onCancel={() => cancelEditing('name')}
                onChange={(e) => {
                  setDraft({ ...current, name: e.target.value });
                  validateField('name', e.target.value);
                }}
              />

              <Field
                label={t('lblEmail')}
                value={current.email}
                editing={editFields.email}
                error={errors.email}
                editLabel={t('btnEdit')}
                cancelLabel={t('btnCancel')}
                onEdit={() => startEditing('email')}
                onCancel={() => cancelEditing('email')}
                onChange={(e) => {
                  setDraft({ ...current, email: e.target.value });
                  validateField('email', e.target.value);
                }}
              />

              <Field
                label={t('lblAbout')}
                value={current.about}
                editing={editFields.about}
                error={errors.about}
                textarea
                editLabel={t('btnEdit')}
                cancelLabel={t('btnCancel')}
                onEdit={() => startEditing('about')}
                onCancel={() => cancelEditing('about')}
                onChange={(e) => {
                  setDraft({ ...current, about: e.target.value });
                  validateField('about', e.target.value);
                }}
              />

              <div className="flex justify-center mt-4">
                <Button
                  className="w-full py-2 text-sm transition-shadow duration-300"
                  onClick={handleSaveProfile}
                  disabled={hasErrors || !(editFields.name || editFields.email || editFields.about)}
                >
                  {t('btnSaveChanges')}
                </Button>
              </div>
            </SectionCard>

            <SectionCard title={t('securityTitle')}>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 border border-[var(--color-border-light)] transition animate-pulse-hover hover:border-[var(--color-primary)]">
                  <p className="text-[var(--color-text-muted)] text-sm mb-2">{t('passwordDesc')}</p>
                  <div className="flex justify-start mt-4">
                    <Button
                      variant="ghost"
                      className="w-full py-1.5 text-sm transition-shadow duration-300"
                      onClick={() => setIsPasswordModalOpen(true)}
                    >
                      {t('btnManagePassword')}
                    </Button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-[var(--color-border-light)] transition animate-pulse-hover hover:border-[var(--color-primary)]">
                  <p className="text-[var(--color-text-muted)] text-sm mb-2">{t('deleteDesc')}</p>
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="ghost"
                      className="w-full py-1.5 text-sm text-red-400 transition-shadow duration-300"
                      onClick={handleDeleteProfile}
                    >
                      {t('btnDeleteAccount')}
                    </Button>
                  </div>
                </div>
              </div>
            </SectionCard>
          </main>
        </div>
      </div>
    </div>
  );
};
