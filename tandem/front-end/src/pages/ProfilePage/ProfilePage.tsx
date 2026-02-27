import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button/Button';
import { SectionCard } from '@/components/SectionCard/SectionCard';
import { Field } from '@/components/Field/Field';
import { ProfileHeader } from './components/ProfileHeader';
import { ChangePasswordModal } from './components/ProfileModals/ChangePasswordModal';
import { ChangeAvatarModal } from './components/ProfileModals/ChangeAvatarModal';

export const ProfilePage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('example@mail.com');
  const [about, setAbout] = useState('Product designer & coffee lover ☕');
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editAbout, setEditAbout] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const handleSaveProfile = async () => toast.success('Changes saved');
  const handleLogout = () => toast('Logged out');

  return (
    <div>
      <Toaster />

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <ChangeAvatarModal open={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} />

      <div className="min-h-screen px-6 pt-32 flex justify-center bg-[radial-gradient(circle_at_20%_30%,var(--color-bg-light),var(--color-bg-dark))]">
        <div className="w-full max-w-5xl space-y-6">
          <ProfileHeader
            name={name}
            email={email}
            about={about}
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
                value={name}
                editing={editName}
                onEdit={() => setEditName(true)}
                onCancel={() => setEditName(false)}
                onChange={(e) => setName(e.target.value)}
              />
              <Field
                label="Email"
                value={email}
                editing={editEmail}
                onEdit={() => setEditEmail(true)}
                onCancel={() => setEditEmail(false)}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Field
                label="About"
                value={about}
                editing={editAbout}
                textarea
                onEdit={() => setEditAbout(true)}
                onCancel={() => setEditAbout(false)}
                onChange={(e) => setAbout(e.target.value)}
              />
              <div className="flex justify-center mt-4">
                <Button
                  className="w-full py-2 text-sm transition-shadow duration-300"
                  onClick={handleSaveProfile}
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
                    Sign out from this device.
                  </p>
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="ghost"
                      className="w-full py-1.5 text-sm text-red-400 transition-shadow duration-300"
                      onClick={handleLogout}
                    >
                      Logout
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
