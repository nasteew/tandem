// pages/LandingPage/components/HeroSection/HeroSection.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/Button/Button';
import { ScreenCanvas } from '../ScreenCanvas/ScreenCanvas';
import { useAuthStore } from '../../../../store/authStore';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onCtaClick?: () => void;
  onLearnMore?: () => void;
}

export const HeroSection = ({ onCtaClick, onLearnMore }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();

  const handleGetStarted = () => {
    if (onCtaClick) {
      onCtaClick();
    }

    if (accessToken) {
      // Если пользователь авторизован, идем на dashboard
      navigate('/dashboard');
    } else {
      // Если не авторизован, идем на регистрацию
      navigate('/auth?mode=register');
    }
  };

  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore();
    }
  };

  return (
    <section aria-labelledby="hero-title" className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.titleWrapper}>
          <h1 id="hero-title" className={styles.mainTitle}>
            PREPARE FOR <span className={styles.gradient}>TECHNICAL INTERVIEWS</span>
          </h1>
        </div>

        <p className={styles.subtitle}>
          Stop stressing about technical interviews.
          <br />
          Start mastering them in a realistic, interactive environment.
          <br />
          Experiment with code, challenge your logic.
        </p>

        <div className={styles.centerContainer}>
          <ScreenCanvas onClick={handleGetStarted} />
        </div>

        <div className={styles.ctaButtons}>
          <Button
            variant="primary"
            size="lg"
            onClick={handleGetStarted}
            className={styles.primaryButton}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleLearnMore}
            className={styles.secondaryButton}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
