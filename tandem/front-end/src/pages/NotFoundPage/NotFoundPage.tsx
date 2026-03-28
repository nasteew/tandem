import { Button } from '@/components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_30%,var(--color-bg-light),var(--color-bg-dark))] text-[#e0e6ff] px-8">
      <div className="text-center p-10 rounded-2xl border border-[var(--color-bg-dark)] bg-[radial-gradient(circle_at_20%_30%,var(--color-bg-light),var(--color-bg-dark))]/30 backdrop-blur-xl shadow-[0_0_20px_var(--color-primary)] max-w-md">
        <h1
          className="text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)] to-[var(--color-primary)]
                     animate-pulse-neon drop-shadow-[0_0_10px_var(--color-primary)] drop-shadow-[0_0_20px_var(--color-primary)]"
        >
          404
        </h1>

        <p className="text-2xl font-bold mb-4 text-[var(--color-text-white)]">Page Not Found</p>

        <p className="text-[var(--color-text-white)] mb-8">
          The page you are looking for does not exist.
        </p>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            className="hover:scale-105 transition-transform duration-200 shadow-[0_0_10px_var(--color-primary)] hover:shadow-[0_0_20px_var(--color-primary)]"
            variant="secondary"
          >
            Go Back
          </Button>

          <Button
            onClick={() => navigate('/')}
            className="hover:scale-105 transition-transform duration-200 shadow-[0_0_10px_var(--color-primary)] hover:shadow-[0_0_20px_var(--color-primary)]"
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
