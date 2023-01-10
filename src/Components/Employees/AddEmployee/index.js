import React, { useState, useEffect } from 'react';
import style from './employeesForm.module.css';
import { useParams, useHistory } from 'react-router-dom';

const AddEmployee = () => {
  const params = useParams();
  const history = useHistory();
  const idEdit = params.id;
  const url = `${process.env.REACT_APP_API_URL}/employees/`;

  const redirect = () => {
    history.goBack();
  };

  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    status: false
  });

  if (idEdit) {
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/employees/${idEdit}`)
        .then((response) => response.json())
        .then((response) => {
          setUserInput({
            name: response.data.name,
            lastName: response.data.lastName,
            email: response.data.email,
            phone: response.data.phone,
            password: response.data.password,
            status: response.data.status
          });
        });
    }, []);
  }

  const editEmployee = async () => {
    const urlEdit = `${process.env.REACT_APP_API_URL}/employees/${idEdit}`;
    userInput.status = userInput.status === 'active' ? true : false;
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInput)
    };
    try {
      const response = await fetch(urlEdit, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        alert('Error, employee was not edited', data);
      } else {
        alert('Employee edited', data.message);
        redirect();
      }
    } catch (error) {
      alert('Error');
    }
  };

  const addEmployee = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInput)
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        alert('Error, employee was not created', data);
      } else {
        alert('Employee added', data.message);
        redirect();
      }
    } catch (error) {
      alert('Error');
    }
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        <label htmlFor="name">Name</label>
        <input name="name" type="text" onChange={onChange} value={userInput.name || ''}></input>
        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          type="text"
          onChange={onChange}
          value={userInput.lastName || ''}
        ></input>
        <label htmlFor="phone">Phone</label>
        <input name="phone" type="text" onChange={onChange} value={userInput.phone || ''}></input>
        <label htmlFor="email">Email</label>
        <input name="email" type="text" onChange={onChange} value={userInput.email || ''}></input>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          onChange={onChange}
          value={userInput.password || ''}
        ></input>
        <label htmlFor="status">Status</label>
        {idEdit ? (
          <select name="status" onChange={onChange}>
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
          </select>
        ) : (
          <select>
            <option name="inactive">Inactive</option>
          </select>
        )}
        <button
          className={style.doneBtn}
          type="button"
          onClick={idEdit ? editEmployee : addEmployee}
        >
          Done
        </button>
        <button type="button" onClick={redirect}>
          Back
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
