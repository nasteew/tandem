import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { GoogleIcon } from '../icons/GoogleIcon';
import { useAuthStore } from '../../store/authStore';
import styles from './AuthForm.module.css';
import { useGoogleLogin } from '@/hooks/auth/useAuthMutations';
import { useTranslation } from 'react-i18next';

export const AuthForm = () => {
  const { mode, setMode } = useAuthStore();
  const navigate = useNavigate();
  const { mutate: googleLogin } = useGoogleLogin();
  const { t } = useTranslation('auth');

  const handleModeSwitch = (newMode: 'login' | 'register') => {
    setMode(newMode);
    navigate(`/auth?mode=${newMode}`, { replace: true });
  };

  return (
    <div className={styles.authCard}>
      <h1 className={styles.title}>{t('authForm.title')}</h1>
      <p className={styles.subtitle}>
        {mode === 'login'
          ? t('authForm.signInTitle')
          : t('authForm.registerTitle')}
      </p>

      <div className={styles.toggleButtons}>
        <button
          className={`${styles.toggleButton} ${mode === 'login' ? styles.active : ''}`}
          onClick={() => handleModeSwitch('login')}
        >
          {t('authForm.signInBtn')}
        </button>
        <button
          className={`${styles.toggleButton} ${mode === 'register' ? styles.active : ''}`}
          onClick={() => handleModeSwitch('register')}
        >
          {t('authForm.registerBtn')}
        </button>
      </div>

      {mode === 'login' ? <LoginForm /> : <RegisterForm />}

      <div className={styles.divider}>
        <span>{t('authForm.orContinueWith')}</span>
      </div>

      <div className={styles.socialButtons}>
        <button className={styles.socialButton} onClick={() => googleLogin()}>
          <GoogleIcon />
          Google
        </button>
      </div>
    </div>
  );
};
