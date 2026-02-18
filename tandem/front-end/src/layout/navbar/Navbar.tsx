import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Robot from '../header/components/Robot/Robot';
import { MenuIcon } from '@/components/icons/MenuIcon';
import { CloseIcon } from '@/components/icons/CloseIcon';
import styles from './Navbar.module.css';

const NAVIGATION_ITEMS = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Widgets', path: '/widgets' },
  { name: 'AI Interview', path: '/agent' },
  { name: 'Statistic', path: '/statistic' },
] as const;

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = prevPathRef.current;

    if (previousPath !== currentPath) {
      prevPathRef.current = currentPath;
      const timeoutId = setTimeout(() => {
        setMenuOpen(false);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    return undefined;
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo} aria-label="Tandem homepage">
          TANDEM
        </Link>

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {menuOpen && (
          <div className={styles.overlay} onClick={() => setMenuOpen(false)} aria-hidden="true" />
        )}

        <div ref={menuRef} className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
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
