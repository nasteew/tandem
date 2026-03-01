import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon } from '../../../../components/icons/MenuIcon';
import { CloseIcon } from '../../../../components/icons/CloseIcon';
import styles from './BurgerMenu.module.css';

interface BurgerMenuProps {
  menuOpen: boolean;
  onMenuToggle: (isOpen: boolean) => void;
}

const NAVIGATION_ITEMS = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Widgets', path: '/widgets' },
  { name: 'AI Interview', path: '/agent' },
  { name: 'Statistic', path: '/statistic' },
] as const;

export const BurgerMenu = ({ menuOpen, onMenuToggle }: BurgerMenuProps) => {
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = prevPathRef.current;

    if (previousPath !== currentPath) {
      prevPathRef.current = currentPath;
      const timeoutId = setTimeout(() => {
        onMenuToggle(false);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    return undefined;
  }, [location.pathname, onMenuToggle]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onMenuToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen, onMenuToggle]);

  return (
    <>
      <button
        className={styles.menuButton}
        onClick={() => onMenuToggle(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => onMenuToggle(false)} aria-hidden="true" />
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
    </>
  );
};
