import { ProfileStatItem } from './ProfileStatItem';

interface ProfileStatsProps {
  stats: { label: string; value: number }[];
}

export const ProfileStats = ({ stats }: ProfileStatsProps) => {
  return (
    <aside
      aria-label="User statistics"
      className="mt-4 md:mt-0 md:ml-auto md:mr-10 flex flex-row gap-3 justify-center md:justify-end"
    >
      {stats.map((stat, idx) => (
        <ProfileStatItem key={idx} label={stat.label} value={stat.value} />
      ))}
    </aside>
  );
};
