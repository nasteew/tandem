import { Navbar } from '../navbar/Navbar';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header role="banner" className={styles.header}>
      <Navbar />
    </header>
  );
};
