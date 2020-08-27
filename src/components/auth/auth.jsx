import React, { useEffect } from 'react';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Error from '../error/error.jsx';
import { regOneLetter, regOneDigit } from '../../utils/regex.js';
import './styles.scss';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Формат почты email@box.com').required('Почту что-то забыли'),
  password: Yup.string()
    .matches(regOneLetter, 'Пароль должен содержать хотя бы 1 латинскую букву')
    .matches(regOneDigit, 'Пароль должен содержать хотя бы 1 цифру')
    .min(8, 'Пароль должен быть не менее 8 символов')
    .required('Было бы неплохо пароль увидеть'),
});

const FocusError = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext();
  useEffect(() => {
    if (isSubmitting && !isValidating) {
      const keys = Object.keys(errors);
      if (keys.length > 0) {
        const selector = `[name=${keys[0]}]`;
        const errorElement = document.querySelector(selector);
        if (errorElement) {
          errorElement.focus();
        }
      }
    }
  }, [errors, isSubmitting, isValidating]);

  return null;
};

const Auth = () => (
  <div className="container">
    <h1>
      Привет, гость! Рады тебя видеть{' '}
      <span role="img" aria-label="Hi">
        👋
      </span>{' '}
      Представишься?
    </h1>
    <p>
      Спамом не завалим и вообще данные никуда не уйдут. Но вы увидите их после отправки формы. Для валидации
      используется связка{' '}
      <a href="https://formik.org/" target="_blank" rel="noopener noreferrer">
        Formik
      </a>
      и{' '}
      <a href="https://github.com/jquense/yup" target="_blank" rel="noopener noreferrer">
        Yup
      </a>
      .
    </p>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__field">
            <label className="form__label" htmlFor="auth-email">
              Email:
              {errors.email && touched.email && <Error error={errors.email} />}
            </label>
            <input
              type="email"
              id="auth-email"
              name="email"
              className="form__input"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="auth-password">
              Пароль:
              <span className="form__hint">
                Пароль должен содержать хотя бы 8 символов, среди которых будет хотя бы одна цифра и латинская буква
              </span>
              {errors.password && touched.password && <Error error={errors.password} />}
            </label>
            <input
              type="password"
              id="auth-password"
              name="password"
              className="form__input"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </div>
          <FocusError />
          <button className="btn" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default Auth;
