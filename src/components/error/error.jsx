import React from 'react';
import { ReactComponent as Error } from '../../images/icons/error.svg';
import './styles.scss';

const FormError = ({ error }) => {
  return (
    <span className="form__error">
      <Error className="form__error-icon" title="Ошибка заполнения поля" />
      {error}
    </span>
  );
};

export default FormError;
