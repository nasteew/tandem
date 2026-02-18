import { Header } from '../../layout/header/Header';
import { HeroSection } from './components/HeroSection/HeroSection';
import styles from './LandingPage.module.css';

export const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main>
        <HeroSection />
      </main>
    </div>
  );
};
