import styles from './modal.module.css';
import Button from '../Button';

const Modal = ({ children, variant = 'modal', showModal, closeModal, text, title }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles[variant]}>
        <Button variant={'closeButton'} onClick={closeModal} text="X" />
        {title ? <h3>{title}</h3> : null}
        <p>{text}</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
