import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../../schema/authSchema';
import { useLoginMutation } from '../../hooks/auth/useAuthMutations';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from '../AuthForm/AuthForm.module.css';

export const LoginForm = () => {
  const mutation = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          {t('loginForm.emailLabel')}
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
          placeholder={t('loginForm.emailPlaceholder')}
        />
        {errors.email && <p className={styles.fieldError}>{errors.email.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          {t('loginForm.passwordLabel')}
        </label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={`${styles.input} ${styles.passwordInput} ${errors.password ? styles.error : ''}`}
            placeholder={t('loginForm.passwordPlaceholder')}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? t('loginForm.hidePassword') : t('loginForm.showPassword')}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className={styles.fieldError}>{errors.password.message}</p>}
      </div>

      {mutation.isError && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {mutation.error?.message || t('loginForm.failed')}
          <button className={styles.closeError} onClick={() => mutation.reset()}>
            ×
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={mutation.isPending || isSubmitting}
        className={styles.submitButton}
      >
        {mutation.isPending ? (
          <span className={styles.loading}>
            <span className={styles.spinner} />
            {t('loginForm.signingIn')}
          </span>
        ) : (
          t('loginForm.signIn')
        )}
      </button>
    </form>
  );
};
