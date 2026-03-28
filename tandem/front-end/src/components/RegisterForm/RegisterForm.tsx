import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../../schema/authSchema';
import { useRegisterMutation } from '../../hooks/auth/useAuthMutations';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from '../AuthForm/AuthForm.module.css';

export const RegisterForm = () => {
  const mutation = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          {t('registerForm.nameLabel')}
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`${styles.input} ${errors.name ? styles.error : ''}`}
          placeholder={t('registerForm.namePlaceholder')}
        />
        {errors.name && <p className={styles.fieldError}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          {t('registerForm.emailLabel')}
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
          placeholder={t('registerForm.emailPlaceholder')}
        />
        {errors.email && <p className={styles.fieldError}>{errors.email.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          {t('registerForm.passwordLabel')}
        </label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={`${styles.input} ${styles.passwordInput} ${errors.password ? styles.error : ''}`}
            placeholder={t('registerForm.passwordPlaceholder')}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? t('registerForm.hidePassword') : t('registerForm.showPassword')}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className={styles.fieldError}>{errors.password.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          {t('registerForm.confirmPasswordLabel')}
        </label>
        <div className={styles.passwordWrapper}>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            className={`${styles.input} ${styles.passwordInput} ${errors.confirmPassword ? styles.error : ''}`}
            placeholder={t('registerForm.confirmPasswordPlaceholder')}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? t('registerForm.hidePassword') : t('registerForm.showPassword')}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className={styles.fieldError}>{errors.confirmPassword.message}</p>
        )}
      </div>

      {mutation.isError && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {mutation.error?.message || t('registerForm.failed')}
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
            {t('registerForm.registering')}
          </span>
        ) : (
          t('registerForm.register')
        )}
      </button>
    </form>
  );
};
