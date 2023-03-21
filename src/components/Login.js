import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../Style/Login.css';

const Login = () => {
  const [userName, setUsername] = useState('');
  const [userPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9090/authenticate', { userName, userPassword });
      const { user, jwtToken } = response.data;
      const roleName = user.role[0].roleName;
      localStorage.setItem('profile', JSON.stringify(user));
      localStorage.setItem('token', jwtToken);

      switch (roleName) {
        case 'Admin':
          window.location.href = '/admin';
          break;
        default:
          window.location.href = '/user';
          break;
      }
    }catch (error) {
      console.error(error);
      setError('Incorrect CIN or password');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>
        CIN:
        <input required type="text" pattern="[0-9]{8}" value={userName} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password
        <div className='password_wrapper'>
        <input
          required
          type={showPassword ? 'text' : 'password'}
          value={userPassword}
          onChange={(event) => setPassword(event.target.value)}
          id="password"
        />
        <FontAwesomeIcon className='eye_icon' icon={showPassword ? faEyeSlash : faEye} onClick={handlePasswordVisibility}/></div>
      </label>
      {error && <div className="error">{error}</div>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
