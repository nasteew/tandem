import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Robot from '../header/components/Robot/Robot';
import { BurgerMenu } from '../header/components/burgerMenu/BurgerMenu';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo} aria-label="Tandem homepage">
          TANDEM
        </Link>

        <BurgerMenu menuOpen={menuOpen} onMenuToggle={setMenuOpen} />

        <div className={styles.robotWrapper}>
          <Robot size={0.8} />
        </div>
      </div>
    </nav>
  );
};
