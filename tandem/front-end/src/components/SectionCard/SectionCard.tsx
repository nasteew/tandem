export const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--color-border-light)] shadow-xl transition-all duration-300 hover:border-[var(--color-primary)] space-y-4 bg-[var(--color-card-bg)]">
    <h2 className="text-lg font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-600">
      {title}
    </h2>
    {children}
  </div>
);
