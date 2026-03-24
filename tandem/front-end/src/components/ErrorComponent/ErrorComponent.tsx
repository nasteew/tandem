import { Button } from '@/components/ui/Button/Button';

export function ErrorBlock({
  message,
  onRetry,
}: {
  message: string | undefined;
  onRetry?: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-8">
      <div
        className="text-center p-10 rounded-2xl border border-[#1a2a55]
        bg-[radial-gradient(circle_at_20%_30%,var(--color-bg-light),var(--color-bg-dark))]/30
        backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,100,0.5)] max-w-md"
      >
        <h2
          className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent
          bg-gradient-to-r from-[#ff4d4d] via-[#ff1a1a] to-[#ff4d4d]
          drop-shadow-[0_0_10px_#ff4d4d] drop-shadow-[0_0_20px_#ff1a1a]"
        >
          Something Went Wrong
        </h2>

        <p className="text-[#a0b0ff] mb-6">{message}</p>

        <div className="flex justify-center gap-4">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="hover:scale-105 transition-transform duration-200
              shadow-[0_0_10px_#ff4d4d] hover:shadow-[0_0_20px_#ff1a1a]"
              variant="secondary"
            >
              Try Again
            </Button>
          )}

          <Button
            onClick={() => window.location.reload()}
            className="hover:scale-105 transition-transform duration-200
            shadow-[0_0_10px_#005eff] hover:shadow-[0_0_20px_#00c6ff]"
          >
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  );
}
