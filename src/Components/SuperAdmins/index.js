import React from 'react';
import { useEffect, useState } from 'react';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal/';
import Table from '../Shared/Table';
import styles from './super-admins.module.css';
import { useParams, useHistory } from 'react-router-dom';

const SuperAdmins = () => {
  const [admins, adminsList] = useState([]);
  const [showModal, setShowModal] = useState({ confirm: false, success: false });
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        adminsList(response.data);
      });
  }, []);

  const editAdmin = (id) => {
    history.push(`super-admins/form/${id}`);
  };

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    });
    adminsList([...admins.filter((admins) => admins._id !== id)]);
    toggleModal('confirm', 'success');
    history.push('/super-admins');
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
    history.push(`super-admins/delete/${id}`);
    toggleModal('confirm');
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
        text="You are going to delete one admin"
      >
        <span>
          <Button
            onClick={() => {
              handleDelete(params.id);
            }}
            text="Yes"
            variant="deleteButton"
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
        text="Admin deleted successfully"
        variant={'successModal'}
      />
      <h2>Super Admins</h2>
      <Button
        text="Add Admins +"
        variant="addButton"
        onClick={() => history.push('super-admins/form')}
      />
      <Table
        headers={['name', 'lastName', 'email', 'status', 'actions']}
        data={admins}
        editItem={editAdmin}
        handleDelete={openDeleteModal}
      />
    </div>
  );
};

export default SuperAdmins;
