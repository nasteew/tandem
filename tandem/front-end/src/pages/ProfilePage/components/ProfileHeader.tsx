import { ProfileStats } from './ProfileStats';

interface ProfileHeaderProps {
  name: string;
  email: string;
  about: string;
  onAvatarClick: () => void;
  stats: { label: string; value: number }[];
}

export const ProfileHeader = ({ name, email, about, onAvatarClick, stats }: ProfileHeaderProps) => {
  return (
    <section
      aria-labelledby="profile-heading"
      className="group flex flex-col md:flex-row md:items-start gap-6"
    >
      <div className="flex-1 rounded-2xl p-6 backdrop-blur-xl border border-[var(--color-border-light)] shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgb(96,165,250,0.6)] flex flex-col md:flex-row items-center gap-6">
        <div
          className="relative w-24 h-24 rounded-full overflow-hidden border border-[var(--color-border-light)] shadow-lg transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgb(96,165,250,0.6)]"
          onClick={onAvatarClick}
        >
          <img
            src="https://i.pravatar.cc/300?img=5"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <header className="flex flex-col gap-1 text-center md:text-left">
          <h1
            id="profile-heading"
            className="text-3xl md:text-3xl font-bold uppercase bg-clip-text text-white"
          >
            {name}
          </h1>

          <p className="text-[var(--color-text-muted)] text-sm">{email}</p>

          <p className="text-[var(--color-text-muted)] text-sm md:text-base max-w-md line-clamp-1 break-words">
            {about}
          </p>
        </header>

        <ProfileStats stats={stats} />
      </div>
    </section>
  );
};
