import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useParams, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal/';
import Button from '../../Shared/Button';

const Form = () => {
  const [input, setInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    status: ''
  });

  const history = useHistory();
  const params = useParams();
  const idAdmin = params.id;
  const [showModal, setShowModal] = useState({ error: false, success: false });
  const [modalMessage, setModalMessage] = useState('');

  useEffect(async () => {
    if (idAdmin) {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/admins/${idAdmin}`);
        const data = await res.json();
        setInput({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password,
          status: data.data.status
        });
      } catch (error) {
        alert('Admin does not exist');
      }
    }
  }, []);

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    history.push('/super-admins');
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const onSubmit = () => {
    if (idAdmin) {
      input.status = input.status === 'active';
      const put = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      };
      const url = `${process.env.REACT_APP_API_URL}/admins/${idAdmin}`;
      fetch(url, put).then(async (res) => {
        const { message, error } = await res.json();
        setModalMessage(message);
        if (!error) {
          toggleModal('success');
        } else {
          toggleModal('error');
        }
      });
    } else {
      input.status = false;
      const post = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      };
      const url = `${process.env.REACT_APP_API_URL}/admins`;
      fetch(url, post).then(async (res) => {
        const { message, error } = await res.json();
        setModalMessage(message);
        if (!error) {
          toggleModal('success');
        } else {
          toggleModal('error');
        }
      });
    }
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal.error}
        closeModal={() => toggleModal('error')}
        text={modalMessage}
        variant="errorModal"
      />
      <Modal
        showModal={showModal.success}
        closeModal={() => {
          toggleModal('success');
          redirect();
        }}
        text={modalMessage}
        variant="successModal"
      />
      <h2>{idAdmin ? 'Edit' : 'Create'} Admin</h2>
      <form className={styles.form}>
        <div className={styles.div}>
          <label className={styles.label}>First Name</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={input.name}
            onChange={onChangeInput}
          />
          <label className={styles.label}>Last Name</label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            value={input.lastName}
            onChange={onChangeInput}
          />
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="text"
            name="email"
            value={input.email}
            onChange={onChangeInput}
          />
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={input.password}
            onChange={onChangeInput}
          />
          {idAdmin ? (
            <>
              <label className={styles.label}>Status</label>
              <select name="status" onChange={onChangeInput} className={styles.select}>
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
              </select>
            </>
          ) : null}
          <div>
            <Button text="Back" onClick={redirect} />
            <Button
              variant={idAdmin ? 'editButton' : 'addButton'}
              text={idAdmin ? 'Edit' : 'Create'}
              onClick={onSubmit}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Form;
