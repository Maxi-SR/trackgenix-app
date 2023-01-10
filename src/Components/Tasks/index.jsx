import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal/Modal';
import { useHistory, useParams } from 'react-router-dom';
import styles from './tasks.module.css';

const Tasks = () => {
  const [tasks, saveTasks] = useState([]);
  const [showModal, setShowModal] = useState({ confirm: false, success: false });
  const params = useParams();
  const history = useHistory();

  useEffect(async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        saveTasks(response.data);
      });
  }, []);

  const editTask = (id) => {
    history.push(`tasks/form/${id}`);
  };

  const toggleModal = (modal, secondModal) => {
    if (secondModal) {
      setShowModal({
        ...showModal,
        [modal]: !showModal[modal],
        [secondModal]: !secondModal[modal]
      });
    } else {
      setShowModal({
        ...showModal,
        [modal]: !showModal[modal]
      });
    }
  };

  const openDeleteModal = (id) => {
    history.push(`tasks/delete/${id}`);
    toggleModal('confirm');
  };

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    saveTasks([...tasks.filter((newListItem) => newListItem._id !== id)]);
    toggleModal('confirm', 'success');
    history.push('/tasks');
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal.confirm}
        closeModal={() => {
          toggleModal('confirm');
          history.goBack();
        }}
        title="Are you sure?"
        text="You are going to delete this task"
      >
        <span>
          <Button
            onClick={() => {
              handleDelete(params.id);
            }}
            text="Yes"
            variant="confirmButton"
          />
          <Button
            onClick={() => {
              toggleModal('confirm');
              history.goBack();
            }}
            text="No"
          />
        </span>
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
        text="Task Deleted"
        variant={'successModal'}
      ></Modal>
      <h2>Tasks</h2>
      <Button text="Add Task +" variant="addButton" onClick={() => history.push('tasks/form')} />
      <Table
        data={tasks}
        handleDelete={openDeleteModal}
        headers={['description', 'updatedAt', 'actions']}
        editItem={editTask}
      />
    </div>
  );
};

export default Tasks;
