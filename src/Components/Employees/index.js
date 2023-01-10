import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Modal from './Modal';
import Trash from './Icon-awesome-trash.png';
import Edit from './Icon-edit-employee.png';
import Add from './Icon-add-employee.png';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setModal] = useState(false);
  const [showModalProjects, setModalProjects] = useState(false);
  const [checkedEmployees, setCheckedEmployees] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data || []);
      });
  }, []);

  const showSuccessMessage = () => {
    const element = document.getElementById('showSuccess');
    element.innerHTML = 'Employee(s) deleted';
    setTimeout(() => {
      element.innerHTML = '';
    }, 1500);
  };

  const closeModal = () => {
    setModal(false);
    setModalProjects(false);
  };

  const employeesToDelete = (evt) => {
    if (evt.target.checked) {
      setCheckedEmployees((current) => [...current, evt.target.id]);
    } else {
      setCheckedEmployees((current) => current.filter((employee) => employee !== evt.target.id));
    }
    return checkedEmployees;
  };

  const deleteEmployees = () => {
    setModal(false);
    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };
    setModal(false);
    setEmployees((current) =>
      current.filter((checkedEmployee) => !checkedEmployees.includes(checkedEmployee._id))
    );
    showSuccessMessage();
    checkedEmployees.forEach(async (employeeId) => {
      const url = `${process.env.REACT_APP_API_URL}/employees/${employeeId}`;

      await fetch(url, options).then(async (response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      });
      setCheckedEmployees((current) => current.filter((employee) => employee != employeeId));
    });
  };

  const redirect = () => {
    window.location.assign('/employees/form');
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div className={styles.addBtn}>
        <p>Add employee</p>
        <img src={Add} onClick={redirect} />
      </div>
      <p className={styles.successMessage} id="showSuccess"></p>

      <Modal
        title={'Are you sure you want to delete this?'}
        show={showModal}
        closeModal={closeModal}
        confirmChanges={deleteEmployees}
      ></Modal>

      <Modal
        title={'Projects'}
        show={showModalProjects}
        confirmChanges={closeModal}
        closeModal={closeModal}
      ></Modal>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.td}></th>
            <th className={styles.td}>Name</th>
            <th className={styles.td}>Last Name</th>
            <th className={styles.td}>Phone</th>
            <th className={styles.td}>Email</th>
            <th className={styles.td}>Projects</th>
            <th className={styles.td}>Status</th>
            <th className={styles.td}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee._id}>
                <td className={styles.td}>
                  <input type="checkbox" onChange={employeesToDelete} id={employee._id}></input>
                </td>
                <td className={styles.td}>{employee.name}</td>
                <td className={styles.td}>{employee.lastName}</td>
                <td className={styles.td}>{employee.phone}</td>
                <td className={styles.td}>{employee.email}</td>
                <td>
                  <ul>
                    {employee.projects.map((project) => {
                      if (project.projectId) {
                        return (
                          <li key={employee._id} className={styles.li}>
                            {project.projectId.name}
                          </li>
                        );
                      }
                    })}
                  </ul>
                </td>
                <td className={styles.td}>{employee.status ? 'Active' : 'Inactive'}</td>
                <td className={styles.td}>
                  <a href={`/employees/form?id=${employee._id}`}>
                    <img src={Edit}></img>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <img src={Trash} className={styles.deleteBtn} onClick={() => setModal(true)} />
    </section>
  );
};

export default Employees;
