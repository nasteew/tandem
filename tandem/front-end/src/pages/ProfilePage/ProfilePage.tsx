import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/Button/Button';
import { SectionCard } from '@/components/SectionCard/SectionCard';
import { Field } from '@/components/Field/Field';
import { ProfileHeader } from './components/ProfileHeader';
import { ChangePasswordModal } from './components/ProfileModals/ChangePasswordModal';
import { ChangeAvatarModal } from './components/ProfileModals/ChangeAvatarModal';
import {
  useDeleteProfile,
  useProfile,
  useUpdatePassword,
  useUpdateProfile,
} from '@/hooks/useProfile';
import type { UserProfile } from '@/types/UserProfile';
import { profileMock } from '@/mocs/profileMock';
import type { UpdatePassword } from '@/types/UpdatePassword';
import { LoadingScreen } from '@/components/Loading/Loading';

export const ProfilePage = () => {
  const { data: profileData, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const deleteProfile = useDeleteProfile();
  const updatePassword = useUpdatePassword();
  const profile = profileData ?? profileMock;

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
        setIsPasswordModalOpen(false);
      },
    });
  };

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  if (isLoading) return <LoadingScreen />;

  if (!profile) return null;

  const current = draft ?? profile;

  const startEditing = (field: keyof typeof editFields) => {
    if (!draft) setDraft(profile);
    setDraft(profile);
    setEditFields({ ...editFields, [field]: true });
  };

  const cancelEditing = (field: keyof typeof editFields) => {
    setDraft(null);
    setEditFields({ ...editFields, [field]: false });
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
      },
    });
  };

  const handleDeleteProfile = () => {
    deleteProfile.mutate();
  };

  return (
    <div>
      <Toaster />

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handleSavePassword}
      />
      <ChangeAvatarModal open={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} />

      <div className="min-h-screen px-6 pt-32 flex justify-center bg-[radial-gradient(circle_at_20%_30%,var(--color-bg-light),var(--color-bg-dark))]">
        <div className="w-full max-w-5xl space-y-6">
          <ProfileHeader
            name={current.name}
            email={current.email}
            about={current.about ?? ''}
            onAvatarClick={() => setIsAvatarModalOpen(true)}
            stats={[
              { label: 'Interview Questions', value: 149 },
              { label: 'Answered Questions', value: 100 },
            ]}
          />

          <main className="grid md:grid-cols-2 gap-6">
            <SectionCard title="PERSONAL INFORMATION">
              <Field
                label="Name"
                value={current.name}
                editing={editFields.name}
                onEdit={() => startEditing('name')}
                onCancel={() => cancelEditing('name')}
                onChange={(e) => setDraft({ ...current, name: e.target.value })}
              />

              <Field
                label="Email"
                value={current.email}
                editing={editFields.email}
                onEdit={() => startEditing('email')}
                onCancel={() => cancelEditing('email')}
                onChange={(e) => setDraft({ ...current, email: e.target.value })}
              />

              <Field
                label="About"
                value={current.about}
                editing={editFields.about}
                textarea
                onEdit={() => startEditing('about')}
                onCancel={() => cancelEditing('about')}
                onChange={(e) => setDraft({ ...current, about: e.target.value })}
              />

              <div className="flex justify-center mt-4">
                <Button
                  className="w-full py-2 text-sm transition-shadow duration-300"
                  onClick={handleSaveProfile}
                  disabled={!(editFields.name || editFields.email || editFields.about)}
                >
                  Save Changes
                </Button>
              </div>
            </SectionCard>

            <SectionCard title="SECURITY">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 border border-[var(--color-border-light)] transition animate-pulse-hover hover:shadow-[0_0_20px_rgb(96,165,250)]">
                  <p className="text-[var(--color-text-muted)] text-sm mb-2">
                    Update your password regularly to keep your account secure.
                  </p>
                  <div className="flex justify-start mt-4">
                    <Button
                      variant="ghost"
                      className="w-full py-1.5 text-sm transition-shadow duration-300"
                      onClick={() => setIsPasswordModalOpen(true)}
                    >
                      Change Password
                    </Button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-[var(--color-border-light)] transition animate-pulse-hover hover:shadow-[0_0_20px_rgb(96,165,250)]">
                  <p className="text-[var(--color-text-muted)] text-sm mb-2">
                    Delete your account permanently.
                  </p>
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="ghost"
                      className="w-full py-1.5 text-sm text-red-400 transition-shadow duration-300"
                      onClick={handleDeleteProfile}
                    >
                      Delete Account
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
