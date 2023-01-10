import { useState, useEffect } from 'react';
import styles from './tasks.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal/Modal';

const Form = () => {
  const [inputValue, setInputValue] = useState({
    description: ''
  });

  const [showModal, setShowModal] = useState({
    success: false,
    error: false
  });

  const [message, setMessage] = useState('');

  const params = useParams();
  const history = useHistory();
  const taskId = params.id;

  useEffect(async () => {
    if (taskId) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`);
        const data = await response.json();
        setInputValue({
          description: data.data.description
        });
      } catch (err) {
        alert('There is no task with id provided');
      }
    }
  }, []);

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    history.goBack();
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const onSubmit = () => {
    if (taskId) {
      const putOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      };
      const url = `${process.env.REACT_APP_API_URL}/tasks/${taskId}`;
      fetch(url, putOptions).then(async (response) => {
        const { message, error } = await response.json();
        setMessage(message);
        if (!error) {
          toggleModal('success');
        } else {
          toggleModal('error');
        }
      });
    } else {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      };
      const url = `${process.env.REACT_APP_API_URL}/tasks`;
      fetch(url, postOptions).then(async (response) => {
        const { message, error } = await response.json();
        setMessage(message);
        if (!error) {
          toggleModal('success');
        } else {
          toggleModal('error');
        }
      });
    }
  };
  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal.success}
        closeModal={() => {
          toggleModal('success');
          redirect();
        }}
        text={message}
        variant={'successModal'}
      />
      <Modal
        showModal={showModal.error}
        closeModal={() => toggleModal('error')}
        text={message}
        variant={'errorModal'}
      />
      <h3>Tasks</h3>
      <form className={styles.form}>
        <div>
          <div>
            <label>Description</label>
          </div>
          <div>
            <input
              type="text"
              name="description"
              value={inputValue.description}
              onChange={onChangeInput}
              placeholder="Task name"
            />
          </div>
        </div>
        <div>
          <Button onClick={redirect} variant={'cancelButton'} text="Back" />
          <Button
            variant={taskId ? 'editButton' : 'addButton'}
            text={taskId ? 'Edit' : 'Create'}
            onClick={onSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
