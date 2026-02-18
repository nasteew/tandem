import { Link } from 'react-router-dom';
import Robot from '../header/components/Robot/Robot';
import styles from './Navbar.module.css';

const NAVIGATION_ITEMS = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Widgets', path: '/widgets' },
  { name: 'AI Interview', path: '/agent' },
  { name: 'Statistic', path: '/statistic' },
] as const;

export const Navbar = () => {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo} aria-label="Tandem homepage">
          TANDEM
        </Link>

        <div className={styles.navLinks}>
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={styles.navLink}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className={styles.robotWrapper}>
          <Robot size={0.8} />
        </div>
      </div>
    </nav>
  );
};
