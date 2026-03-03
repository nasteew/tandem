import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { GoogleIcon } from '../icons/GoogleIcon';
import { useAuthStore } from '../../store/authStore';
import styles from './AuthForm.module.css';

export const AuthForm = () => {
  const { mode, setMode } = useAuthStore();
  const navigate = useNavigate();

  const handleModeSwitch = (newMode: 'login' | 'register') => {
    setMode(newMode);
    navigate(`/auth?mode=${newMode}`, { replace: true });
  };

  return (
    <div className={styles.authCard}>
      <h1 className={styles.title}>TANDEM</h1>
      <p className={styles.subtitle}>
        {mode === 'login'
          ? 'Continue your journey to master technical interviews'
          : 'Start your path to becoming a senior developer'}
      </p>

      <div className={styles.toggleButtons}>
        <button
          className={`${styles.toggleButton} ${mode === 'login' ? styles.active : ''}`}
          onClick={() => handleModeSwitch('login')}
        >
          SIGN IN
        </button>
        <button
          className={`${styles.toggleButton} ${mode === 'register' ? styles.active : ''}`}
          onClick={() => handleModeSwitch('register')}
        >
          REGISTER
        </button>
      </div>

      {mode === 'login' ? <LoginForm /> : <RegisterForm />}

      <div className={styles.divider}>
        <span>or continue with</span>
      </div>

      <div className={styles.socialButtons}>
        <button className={styles.socialButton}>
          <GoogleIcon />
          Google
        </button>
      </div>
    </div>
  );
};
