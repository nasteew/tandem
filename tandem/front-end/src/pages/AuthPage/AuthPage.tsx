// pages/AuthPage/AuthPage.tsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { useAuthStore } from '../../store/authStore';
import styles from './AuthPage.module.css';

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const { mode, setMode } = useAuthStore();

  useEffect(() => {
    const urlMode = searchParams.get('mode');

    if (urlMode === 'login' || urlMode === 'register') {
      if (urlMode !== mode) {
        setMode(urlMode);
      }
    } else {
      if (mode !== 'login') {
        setMode('login');
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('mode', 'login');
        window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams}`);
      }
    }
  }, [searchParams, mode, setMode]);

  return (
    <div className={styles.container}>
      <div className={styles.authWrapper}>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
