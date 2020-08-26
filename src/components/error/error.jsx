import React from 'react';
import './styles.css';

const FormError = ({ error }) => {
    return (
        <span className='form__error'>
            {error}
        </span>
    );
};

export default FormError;
