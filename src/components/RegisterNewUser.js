import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/RegisterNewUser.css'
function RegisterNewUser (){

  const [userName, setUserName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');


  useEffect(() => {
    // Fetch roles from API and update state
    fetch('http://localhost:9090/roles')
      .then(response => response.json())
      .then(data => setRoles(data));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      userName,
      userFirstName,
      userLastName,
      userPassword,
      role: [
        {
          roleName: selectedRole
        }
      ]
    };
    try {
        const response = axios.post('http://localhost:9090/registerNewUser',newUser );    
        console.log(newUser);
        localStorage.setItem('profile', JSON.stringify(newUser));
        const jwtToken = response.data;
        localStorage.setItem('token', jwtToken);
        const roleName = newUser.role[0].roleName;

     window.location.href="/"

  } catch (error) {
      console.error(error);
    }}
  return (

    <form onSubmit={handleSubmit} className="register_form">
      <div>
        <label htmlFor="userName">CIN:</label><br/>
        <input required
          type="text"
          id="userName"
          value={userName}
          pattern="[0-9]{8}"
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="userFirstName">First Name:</label><br/>
        <input required
          type="text"
          id="userFirstName"
          value={userFirstName}
          onChange={(event) => setUserFirstName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="userLastName">Last Name:</label><br/>
        <input required
          type="text"
          id="userLastName"
          value={userLastName}
          onChange={(event) => setUserLastName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="userPassword">Password:</label><br/>
        <input required
          type="password"
          id="userPassword"
          value={userPassword}
          onChange={(event) => setUserPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="roleName">Role Name:</label><br/>
   
      </div>
      <button href="/" type="submit">Create User</button>
    </form>
  );
}
export default RegisterNewUser;