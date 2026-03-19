import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <main className={styles.authContent}>
        <Outlet />
      </main>
    </div>
  );
};
