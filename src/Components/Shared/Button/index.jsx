import React from 'react';
import styles from './button.module.css';

const Button = ({ type, onClick, variant = 'cancelButton', text }) => {
  return (
    <button type={type ? type : 'button'} className={styles[variant]} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
