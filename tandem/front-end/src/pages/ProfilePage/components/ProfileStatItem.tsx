import { AnimatedNumber } from '../../../components/AnimatedNumber/AnimatedNumber';

interface ProfileStatItemProps {
  label: string;
  value: number | string;
}

export const ProfileStatItem = ({ label, value }: ProfileStatItemProps) => {
  return (
    <article className="w-28 md:w-32 p-3 max-w-36 rounded-xl bg-white/5 border border-[var(--color-border-light)] backdrop-blur-md flex-1 text-center">
      <p className="text-[var(--color-text-muted)] md:text-base uppercase font-bold text-sm">
        {label}
      </p>
      <p className="text-white font-bold text-lg">
        <AnimatedNumber value={value} />
      </p>
    </article>
  );
};
