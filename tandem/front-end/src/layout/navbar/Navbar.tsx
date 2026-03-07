import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Robot from '../header/components/Robot/Robot';
import { BurgerMenu } from '../header/components/burgerMenu/BurgerMenu';
import { useAuthStore } from '../../store/authStore';
import { useLogoutMutation } from '../../hooks/useAuthMutations';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { accessToken } = useAuthStore();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

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
            HOME
          </Link>
          <button onClick={() => handleNavigation('/dashboard')} className={styles.navLink}>
            DASHBOARD
          </button>
          <button onClick={() => handleNavigation('/widgets')} className={styles.navLink}>
            WIDGETS
          </button>
          <button onClick={() => handleNavigation('/agent')} className={styles.navLink}>
            AI INTERVIEW
          </button>
          <button onClick={() => handleNavigation('/statistic')} className={styles.navLink}>
            STATISTIC
          </button>
        </div>

        <div className={styles.authSection}>
          {accessToken ? (
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className={styles.logoutButton}
            >
              {logoutMutation.isPending ? 'LOGGING OUT...' : 'LOG OUT'}
            </button>
          ) : (
            <Link to="/auth?mode=login" className={styles.loginButton}>
              SIGN IN
            </Link>
          )}
        </div>

        <BurgerMenu menuOpen={menuOpen} onMenuToggle={handleMenuToggle} />

        <div className={styles.robotWrapper}>
          <Robot size={0.8} />
        </div>
      </div>
    </nav>
  );
};
