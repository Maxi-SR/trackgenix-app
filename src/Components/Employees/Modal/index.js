import styles from './modal.module.css';

const Modal = ({ confirmChanges, closeModal, title, show }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Modal</h3>
        <p>{title}</p>
        <button onClick={confirmChanges}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
};

export default Modal;
