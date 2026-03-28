import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuIcon } from '../../../../components/icons/MenuIcon';
import { CloseIcon } from '../../../../components/icons/CloseIcon';
import { useAuthStore } from '../../../../store/authStore';
import { useLogoutMutation } from '../../../../hooks/auth/useAuthMutations';
import styles from './BurgerMenu.module.css';
import { useTranslation } from 'react-i18next';

interface BurgerMenuProps {
  menuOpen: boolean;
  onMenuToggle: (isOpen: boolean) => void;
}

const NAV_ITEMS = [
  { key: 'home', path: '/' },
  { key: 'dashboard', path: '/dashboard' },
  { key: 'widgets', path: '/widgets' },
  { key: 'aiInterview', path: '/agent' },
  { key: 'statistic', path: '/statistic' },
  { key: 'profile', path: '/profile' },
];

export const BurgerMenu = ({ menuOpen, onMenuToggle }: BurgerMenuProps) => {
  const { t } = useTranslation('navbar');
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(location.pathname);
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
    if (prevPathRef.current !== location.pathname) {
      if (menuOpen) {
        onMenuToggle(false);
      }
      prevPathRef.current = location.pathname;
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
              key={item.key}
              onClick={() => handleNavigation(item.path)}
              className={styles.menuItem}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}

          <button
            onClick={handleAuthAction}
            className={styles.authMenuItem}
            disabled={logoutMutation.isPending}
          >
            {accessToken ? (logoutMutation.isPending ? t('auth.loggingOut') : t('auth.logout')) : t('auth.signIn')}
          </button>
        </div>
      </div>
    </>
  );
};
