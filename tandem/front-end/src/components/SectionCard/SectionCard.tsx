export const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--color-border-light)] shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgb(96,165,250,0.6)] space-y-4">
    <h2 className="text-lg font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-400">
      {title}
    </h2>
    {children}
  </div>
);
