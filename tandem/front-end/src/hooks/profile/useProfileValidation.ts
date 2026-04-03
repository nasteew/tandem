import { useState } from 'react';
import { profileSchema, passwordSchema } from '../../schema/profileSchema';
import { useTranslation } from 'react-i18next';

export const useProfileValidation = () => {
  const { t } = useTranslation('auth');

  const schema = profileSchema(t);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    about: '',
  });

  const validateField = (field: keyof typeof errors, value: string) => {
    const fieldSchema = schema.shape[field];
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      setErrors((prev) => ({ ...prev, [field]: result.error.issues[0].message }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const resetFieldError = (field: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const resetAllErrors = () => {
    setErrors({ name: '', email: '', about: '' });
  };

  const hasErrors = Object.values(errors).some((e) => e.length > 0);

  return {
    errors,
    validateField,
    resetFieldError,
    resetAllErrors,
    hasErrors,
  };
};

export const usePasswordValidation = () => {
  const { t } = useTranslation('auth');

  const schema = passwordSchema(t);

  const [error, setError] = useState('');

  const validatePassword = (value: string) => {
    const result = schema.shape.password.safeParse(value);

    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError('');
    }
  };

  const resetError = () => setError('');

  return {
    error,
    validatePassword,
    resetError,
    hasError: Boolean(error),
  };
};
