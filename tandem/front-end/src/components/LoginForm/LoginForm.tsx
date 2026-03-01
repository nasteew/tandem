import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../../schema/authSchema';
import { useLoginMutation } from '../../hooks/useAuthMutations';
import styles from '../AuthForm/AuthForm.module.css';

export const LoginForm = () => {
  const mutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
          placeholder="john@example.com"
        />
        {errors.email && <p className={styles.fieldError}>{errors.email.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={`${styles.input} ${errors.password ? styles.error : ''}`}
          placeholder="********"
        />
        {errors.password && <p className={styles.fieldError}>{errors.password.message}</p>}

        <div className={styles.forgotPassword}>
          <a href="#" className={styles.forgotLink}>
            Forgot password?
          </a>
        </div>
      </div>

      {mutation.isError && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {mutation.error?.message || 'Login failed'}
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
            Signing in...
          </span>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
};
