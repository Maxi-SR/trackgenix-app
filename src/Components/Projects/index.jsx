import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import styles from './projects.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal/';
import { useHistory, useParams } from 'react-router-dom';

const Projects = () => {
  const [projects, saveProjects] = useState([]);
  const [showModal, setShowModal] = useState({ confirm: false, success: false, employees: false });
  const [employees, saveEmployees] = useState([]);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    saveProjects([...projects.filter((project) => project._id !== id)]);
    toggleModal('confirm', 'success');
    history.push('/projects');
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
    history.push(`projects/delete/${id}`);
    toggleModal('confirm');
  };

  const editRow = (id) => {
    history.push(`projects/form/${id}`);
  };

  const showEmployeesModal = (id) => {
    history.push(`projects/${id}/employees`);
    toggleModal('employees');
    const data = projects.find((project) => project._id === id);
    saveEmployees(data.employees);
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
        text="Do you really want to delete this project?
        This process cannot be undone."
      >
        <span>
          <Button
            onClick={() => {
              toggleModal('confirm');
              history.goBack();
            }}
            variant={'cancelButton'}
            text="No"
          />
          <Button
            onClick={() => {
              handleDelete(params.id);
            }}
            text="Yes"
            variant={'confirmButton'}
          />
        </span>
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
        text="Project deleted successfully"
        variant={'successModal'}
      />
      <Modal
        showModal={showModal.employees}
        closeModal={() => {
          toggleModal('employees');
          history.goBack();
        }}
        title="Employees List"
      >
        {employees.length > 0 ? (
          <Table headers={['rate', 'role']} data={employees} />
        ) : (
          <p>There are no employees in this project</p>
        )}
      </Modal>
      <h2>Projects</h2>
      <Button
        text="Add Project +"
        variant="addButton"
        onClick={() => history.push('/projects/form')}
      />
      <Table
        headers={[
          'name',
          'startDate',
          'endDate',
          'description',
          'clientName',
          'employees',
          'status',
          'actions'
        ]}
        data={projects}
        handleDelete={openDeleteModal}
        editItem={editRow}
        showInfo={showEmployeesModal}
      />
    </div>
  );
};

export default Projects;
