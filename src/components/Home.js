import axios from 'axios';
import Sidebar from './AdminPageSideBar'
import React, { useState, useEffect } from 'react';

function Home() {
    const [cin, setUserName] = useState('');
    const [firstName, setUserFirstName] = useState('');
    const [lastName, setUserLastName] = useState('');
    const [email, setUserEmail] = useState('');
    
  function handleSubmit  (event) {
    event.preventDefault();
    const newRequest = { cin, firstName, lastName, email} ;
    try{axios.post('http://localhost:9090/NewRegisterationRequest',newRequest)
      .then(response => {
        console.log('Registration request saved successfully:', response.data);
      })
    }catch(error) {
        console.error('Error saving registration request:', error);
      };
  }
  
    return (
        <div>
            <h1>Home page</h1>
            <a href="/login">Login</a>


            <form onSubmit={handleSubmit} className="register_form">
      <div>
        <label htmlFor="cin">CIN:</label><br/>
        <input required
          type="text"
          id="cin"
          value={cin}
          pattern="[0-9]{8}"
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name:</label><br/>
        <input required
          type="text"
          id="firstName"
          value={firstName}
          onChange={(event) => setUserFirstName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label><br/>
        <input required
          type="text"
          id="lastName"
          value={lastName}
          onChange={(event) => setUserLastName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label><br/>
        <input required
          type="email"
          id="email"
          value={email}
          onChange={(event) => setUserEmail(event.target.value)}
        />
      </div>

 
      <button  type="submit">Send Request</button>
    </form>
        </div>
    )
}

export default Home
