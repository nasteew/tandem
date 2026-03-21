import { Button } from '@/components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f2c] text-[#e0e6ff] px-8">
      <div className="text-center p-10 rounded-2xl border border-[#1a2a55] bg-[#0f143c]/70 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,100,0.5)] max-w-md">
        <h1
          className="text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00c6ff] via-[#005eff] to-[#00c6ff]
                     animate-pulse-neon drop-shadow-[0_0_10px_#00c6ff] drop-shadow-[0_0_20px_#005eff]"
        >
          404
        </h1>

        <p className="text-2xl font-bold mb-4">Page Not Found</p>

        <p className="text-[#a0b0ff] mb-8">The page you are looking for does not exist.</p>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            className="hover:scale-105 transition-transform duration-200 shadow-[0_0_10px_#00c6ff] hover:shadow-[0_0_20px_#005eff]"
            variant="secondary"
          >
            Go Back
          </Button>

          <Button
            onClick={() => navigate('/')}
            className="hover:scale-105 transition-transform duration-200 shadow-[0_0_10px_#005eff] hover:shadow-[0_0_20px_#00c6ff]"
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
