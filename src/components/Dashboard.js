import React, { useState , useEffect } from 'react';
import Sidebar from './AdminPageSideBar';
import axios from 'axios';

const DeleteButton = ( {cin} ) => {
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:9090/deleteRequest/`+cin);
      } catch (error) {
        console.error(error);
      }
      window.location.reload();

    };
  
    return (
      <button className='delete_button' onClick={handleDelete}>
        Reject
      </button>
    );
  };

function Dashboard() {
    const userData = JSON.parse(localStorage.getItem('profile'));
    const userPhrase = `This is the  ${userData.role[0].roleName} dashboard Your CIN is ${userData.userName} `;




      
        const [requests, setRequests] = useState([]);

        useEffect(() => {
          axios
            .get("http://localhost:9090/RegistrationRequests")
            .then((response) => {
              setRequests(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }, []);
      
    return (
        <div>
            <Sidebar/>
           <h1> {userPhrase}</h1>
           <h2>Registration Requests</h2>
      <table>
        <thead>
          <tr>
            <th>CIN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {requests && requests.map((request) => (
            <tr key={request.cin}>
              <td>{request.cin}</td>
              <td>{request.firstName}</td>
              <td>{request.lastName}</td>
              <td>{request.email}</td>
              <td>
              <button >Accept</button>
              <DeleteButton cin={request.cin} className="delete_button"/>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}

export default Dashboard
