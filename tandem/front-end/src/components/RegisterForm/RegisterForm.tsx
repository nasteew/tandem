import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../../schema/authSchema';
import { useRegisterMutation } from '../../hooks/useAuthMutations';
import styles from '../AuthForm/AuthForm.module.css';

export const RegisterForm = () => {
  const mutation = useRegisterMutation();

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
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`${styles.input} ${errors.name ? styles.error : ''}`}
          placeholder="Julia"
        />
        {errors.name && <p className={styles.fieldError}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
          placeholder="julia@mail.ru"
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
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
          placeholder="********"
        />
        {errors.confirmPassword && (
          <p className={styles.fieldError}>{errors.confirmPassword.message}</p>
        )}
      </div>

      {mutation.isError && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {mutation.error?.message || 'Registration failed'}
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
            Registering...
          </span>
        ) : (
          'Register'
        )}
      </button>
    </form>
  );
};
