import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button/Button';
import { ScreenCanvas } from '../ScreenCanvas/ScreenCanvas';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

export const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  const navigate = useNavigate();

  const handleRegClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
    navigate('/auth?mode=register');
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
          <ScreenCanvas onClick={handleRegClick} />
        </div>

        <div className={styles.ctaButtons}>
          <Button variant="primary" size="lg" onClick={handleRegClick} className={styles.ctaButton}>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};
