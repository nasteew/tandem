import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import Robot from '../header/components/Robot/Robot';
import { BurgerMenu } from '../header/components/burgerMenu/BurgerMenu';
import { useAuthStore } from '../../store/authStore';
import { useLogoutMutation } from '../../hooks/auth/useAuthMutations';
import { useTheme } from '../../hooks/useTheme';
import LanguageSwitcher from '../../components/LanguageSwitcher/languageSwitcher';
import styles from './Navbar.module.css';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { accessToken, user, isInitialized } = useAuthStore();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();
  const { t } = useTranslation('navbar');
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

  const handleLogout = () => {
    logoutMutation.mutate();
    localStorage.removeItem('chat_conversation_id');
    localStorage.removeItem('tandem_interview_level');
  };

  const handleNavigation = (path: string) => {
    if (!accessToken) {
      navigate('/auth?mode=login');
    } else {
      navigate(path);
    }
  };

  const handleMenuToggle = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo} aria-label="Tandem homepage">
          TANDEM
        </Link>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            {t('nav.home')}
          </Link>
          <button onClick={() => handleNavigation('/dashboard')} className={styles.navLink}>
            {t('nav.dashboard')}
          </button>
          <button onClick={() => handleNavigation('/widgets')} className={styles.navLink}>
            {t('nav.widgets')}
          </button>
          <button onClick={() => handleNavigation('/agent')} className={styles.navLink}>
            {t('nav.aiInterview')}
          </button>
          <button onClick={() => handleNavigation('/statistic')} className={styles.navLink}>
            {t('nav.statistic')}
          </button>
        </div>

        <div className={styles.authSection}>
          {!isInitialized ? null : accessToken ? (
            <>
              <Link to="/profile" className={styles.profileLink} aria-label="Profile">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={`${user.name || 'User'}'s avatar`}
                    className={styles.avatar}
                  />
                ) : (
                  <UserCircle size={28} className={styles.profileIcon} />
                )}
              </Link>
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className={styles.logoutButton}
              >
                {logoutMutation.isPending ? t('auth.loggingOut') : t('auth.logout')}
              </button>
            </>
          ) : (
            <Link to="/auth?mode=login" className={styles.loginButton}>
              {t('auth.signIn')}
            </Link>
          )}
        </div>
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Switch theme">
              {theme === 'dark' ? '🌞' : '🌙'}
          </button>
          <LanguageSwitcher />
        <BurgerMenu menuOpen={menuOpen} onMenuToggle={handleMenuToggle} />

        <div className={styles.robotWrapper}>
          <Robot size={0.8} />
        </div>
      </div>
    </nav>
  );
};
