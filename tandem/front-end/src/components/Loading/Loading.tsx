export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_30%,var(--color-bg-light),var(--color-bg-dark))]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
      </div>
    </div>
  );
};
