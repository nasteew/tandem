import { useRef } from 'react';
import { Header } from '../../layout/header/Header';
import { HeroSection } from './components/HeroSection/HeroSection';
import { FeaturesSection } from './components/FeaturesSection/FeaturesSection';
import styles from './LandingPage.module.css';

export const LandingPage = () => {
  const featuresRef = useRef<HTMLElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className="landing-content">
        <HeroSection onLearnMore={scrollToFeatures} />
        <FeaturesSection ref={featuresRef} />
      </main>
    </div>
  );
};
