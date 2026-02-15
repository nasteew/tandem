import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button/Button';
import { ScreenCanvas } from './LandingPageCanvas';
import styles from './LandingPage.module.css';

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Widgets', path: '/widgets' },
    { name: 'AI Interview', path: '/agent' },
    { name: 'Statistic', path: '/statistic' },
  ];

  const handleRegClick = () => {
    navigate('/auth?mode=register');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className={styles.container}>
      {/* Навигация */}
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            TANDEM
          </div>

          <div className={styles.navLinks}>
            {features.map((feature) => (
              <a
                key={feature.name}
                href={feature.path}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, feature.path)}
              >
                {feature.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>
            PREPARE FOR <span className={styles.gradient}>TECHNICAL INTERVIEWS</span>
          </h1>

          <p className={styles.subtitle}>
            Stop stressing about technical interviews.
            <br />
            Start mastering them in a realistic, interactive environment.
            <br />
            Experiment with code, challenge your logic.
          </p>

          {/* Центральный контейнер с ноутбуком */}
          <div className={styles.centerContainer}>
            <ScreenCanvas onClick={handleRegClick} />
          </div>

          <div className={styles.bottomButtons}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleRegClick}
              className={styles.bottomButton}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
