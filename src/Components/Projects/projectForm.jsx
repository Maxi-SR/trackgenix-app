import { useState, useEffect } from 'react';
import styles from './projectForm.module.css';
import Modal from '../Shared/Modal/';
import Button from '../Shared/Button';
import { useHistory, useParams } from 'react-router-dom';

const ProjectForm = () => {
  const history = useHistory();
  const params = useParams();
  const id = params.id;
  const url = `${process.env.REACT_APP_API_URL}/projects`;
  const [showModal, setShowModal] = useState({ success: false, error: false });
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    clientName: '',
    status: false
  });

  const fixDate = (date) => {
    return date.slice(0, 10);
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  useEffect(async () => {
    if (id) {
      fetch(url + '/' + id)
        .then((res) => res.json())
        .then((data) =>
          setInputValue({
            name: data.data.name,
            startDate: fixDate(data.data.startDate),
            endDate: fixDate(data.data.endDate),
            description: data.data.description,
            clientName: data.data.clientName,
            status: data.data.status
          })
        );
    }
  }, []);

  const redirect = () => {
    history.goBack();
  };

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (id) {
      inputValue.status = inputValue.status === 'active';
      const put = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      };
      fetch(url + '/' + id, put).then(async (response) => {
        const { message, error } = await response.json();
        setMessage(message);
        if (!error) {
          toggleModal('success');
        } else {
          toggleModal('error');
        }
      });
    } else {
      const post = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      };
      fetch(`${process.env.REACT_APP_API_URL}/projects`, post).then(async (response) => {
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
      <h2>{id ? 'Edit' : 'Create'} Project</h2>
      <Modal
        showModal={showModal.success}
        variant={'successModal'}
        closeModal={() => {
          toggleModal('success');
          redirect();
        }}
        text={message}
      ></Modal>
      <Modal
        showModal={showModal.error}
        variant={'errorModal'}
        closeModal={() => toggleModal('error')}
        text={message}
      ></Modal>
      <form className={styles.form}>
        <label>Project Name</label>
        <input
          name="name"
          defaultValue={inputValue.name}
          onChange={onChangeInput}
          placeholder="Project Name"
        ></input>
        <label>Description</label>
        <textarea
          name="description"
          defaultValue={inputValue.description}
          onChange={onChangeInput}
          placeholder="Description"
        ></textarea>
        <label>Start Date</label>
        <input
          name="startDate"
          type="date"
          defaultValue={inputValue.startDate}
          onChange={onChangeInput}
        ></input>
        <label>End Date</label>
        <input
          name="endDate"
          type="date"
          defaultValue={inputValue.endDate}
          onChange={onChangeInput}
        ></input>
        <label>Client</label>
        <input
          name="clientName"
          defaultValue={inputValue.clientName}
          onChange={onChangeInput}
          placeholder="Client Name"
        ></input>
        {id ? (
          <div>
            <label>Status</label>
            <select
              name="status"
              onChange={onChangeInput}
              defaultValue={inputValue.status ? 'active' : 'inactive'}
            >
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
            </select>
          </div>
        ) : null}
        <div>
          <Button variant={'cancelButton'} text="Back" onClick={redirect} />
          <Button
            variant={id ? 'editButton' : 'addButton'}
            text={id ? 'Edit' : 'Create'}
            onClick={onSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
