// layout/header/components/burgerMenu/BurgerMenu.tsx
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuIcon } from '../../../../components/icons/MenuIcon';
import { CloseIcon } from '../../../../components/icons/CloseIcon';
import { useAuthStore } from '../../../../store/authStore';
import { useLogoutMutation } from '../../../../hooks/useAuthMutations';
import styles from './BurgerMenu.module.css';

interface BurgerMenuProps {
  menuOpen: boolean;
  onMenuToggle: (isOpen: boolean) => void;
}

const NAV_ITEMS = [
  { name: 'HOME', path: '/' },
  { name: 'DASHBOARD', path: '/dashboard' },
  { name: 'WIDGETS', path: '/widgets' },
  { name: 'AI INTERVIEW', path: '/agent' },
  { name: 'STATISTIC', path: '/statistic' },
];

export const BurgerMenu = ({ menuOpen, onMenuToggle }: BurgerMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const { accessToken } = useAuthStore();
  const logoutMutation = useLogoutMutation();

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

  useEffect(() => {
    if (menuOpen) {
      onMenuToggle(false);
    }
  }, [location.pathname, menuOpen, onMenuToggle]);

  const handleNavigation = (path: string) => {
    onMenuToggle(false);
    if (!accessToken && path !== '/') {
      navigate('/auth?mode=login');
    } else {
      navigate(path);
    }
  };

  const handleAuthAction = () => {
    onMenuToggle(false);
    if (accessToken) {
      logoutMutation.mutate();
    } else {
      navigate('/auth?mode=login');
    }
  };

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

      <div ref={menuRef} className={`${styles.menuContainer} ${menuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menuContent}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={styles.menuItem}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {item.name}
            </button>
          ))}

          <button
            onClick={handleAuthAction}
            className={styles.authMenuItem}
            disabled={logoutMutation.isPending}
          >
            {accessToken ? (logoutMutation.isPending ? 'EXITING...' : 'EXIT') : 'SIGN IN'}
          </button>
        </div>
      </div>
    </>
  );
};
