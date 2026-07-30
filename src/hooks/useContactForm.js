import { useState } from 'react';

const useContactForm = (initialValues = {}) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    ...initialValues,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!values.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!values.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!values.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (onSubmit) => {
    if (!validate()) return false;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSubmit) {
        await onSubmit(values);
      }

      setSubmitSuccess(true);
      setValues({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      return true;
    } catch (error) {
      setErrors({ submit: 'Error al enviar el formulario' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setValues({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      ...initialValues,
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleSubmit,
    reset,
  };
};

export default useContactForm;
