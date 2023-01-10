import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Table from '../Shared/Table';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const Admins = () => {
  const history = useHistory();
  const [entityData, saveEntity] = useState([]);
  const [showModal, setShowModal] = useState({ info: false, delete: false, success: false });
  const [entity, setEntity] = useState('projects');
  const params = useParams();
  const [relatedEntity, setRelatedEntity] = useState([]);

  useEffect(async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveEntity(response.data);
      });
  }, []);

  const handleEntity = async (entityToSet) => {
    setEntity(entityToSet);
    await fetch(`${process.env.REACT_APP_API_URL}/${entityToSet}`)
      .then((response) => response.json())
      .then((response) => {
        saveEntity(response.data);
      });
  };

  const deleteAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/${entity}/${id}`, {
      method: 'DELETE'
    });
    saveEntity([...entityData.filter((newListItem) => newListItem._id !== id)]);
    toggleModal('confirm', 'success');
    history.push('/admins');
  };

  const editAdmin = (id) => {
    history.push(`/${entity}/form/${id}`);
  };

  const openDeleteModal = (id) => {
    history.push(`admins/delete/${id}`);
    toggleModal('confirm');
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

  const handleRelatedEntity = (relatedData) => {
    setRelatedEntity(relatedData);
    toggleModal('info');
  };

  setHeaders = () => {
    entity === 'projects' ? (['name',
    'description',
    'clientName',
    'status',
    'startDate',
    'endDate',
    'employees',
    'actions']) : (['name', 'lastName', 'email', 'actions'])
  }

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal.confirm}
        closeModal={() => toggleModal('confirm')}
        title="Are you sure?"
        text="You are going to delete this project"
      >
        <Button
          onClick={() => {
            deleteAdmin(params.id);
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
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
        text="Project Deleted"
      >
        <Button onClick={() => toggleModal('success')} text="OK" />
      </Modal>
      <Modal showModal={showModal.info} closeModal={() => toggleModal('info')}>
        {relatedEntity.length > 0 ? (
          <Table data={relatedEntity} headers={['role', 'rate']} />
        ) : (
          <p>No data to show</p>
        )}
      </Modal>
      <div className={styles.selectEntity}>
        <Button text="Employees" onClick={() => handleEntity('employees')} variant="saveButton" />
        <Button text="Projects" onClick={() => handleEntity('projects')} variant="saveButton" />
      </div>
      <h1 className={styles.title}>{entity}</h1>
      <Table
        data={entityData}
        headers={setHeaders}
        editItem={editAdmin}
        handleDelete={openDeleteModal}
        handleRelatedEntity={handleRelatedEntity}
      />
      <div className={styles.selectEntity}>
        {entity === 'projects' && (
          <Button
            text={'Add projects'}
            onClick={() => {
              history.push('/projects/form');
            }}
            variant="addButton"
          />
        )}
      </div>
    </section>
  );
};

export default Admins;
