import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button,  Modal, Form } from 'react-bootstrap';
import '../Style/AdminPage.css'
import Sidebar from './AdminPageSideBar'
import Keycloak from 'keycloak-js';




const DeleteButton = ( {userName} ) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9090/delete/`+userName);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className='delete_button' onClick={handleDelete}>
      Delete
    </button>
  );
};






const UserEdit = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    userName : user.userName,
    userFirstName: user.userFirstName,
    userLastName: user.userLastName,
    userPassword:user.userPassword,
    role: [{ roleName: user.role[0].roleName }],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`http://localhost:9090/updateUser/${user.userName}`, formData, config);
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;  
    if (name === 'roleName') {
      setFormData((prevState) => ({
        ...prevState,
        role: [{ roleName: value }],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className='edit_form_title'>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUserName">
            <Form.Label>CIN</Form.Label>
            <Form.Control required pattern="[0-9]{8}" type="text" name="userName" value={formData.userName} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formUserFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text" name="userFirstName" value={formData.userFirstName} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formUserLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required type="text" name="userLastName" value={formData.userLastName} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>password</Form.Label>
            <Form.Control required type="text" name="userPassword" value={formData.userPassword} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formUserRole">
            <Form.Label>Role</Form.Label>
            <Form.Control required as="select" name="roleName" value={formData.roleName} onChange={handleChange}>
              <option value="User">User</option>
              <option  value="Admin">Admin</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" >
            Save changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};









const AdminPage = () => {

    const [users, setUsers] = useState([]);  
    const profile = JSON.parse(localStorage.getItem('profile')); 
    const [userToEdit, setUserToEdit] = useState(null);
    const [showEditUser, setShowEditUser] = useState(false);
    const handleEditUser = (user) => {
      setUserToEdit(user);
      setShowEditUser(true);
    };
    
    
    useEffect(() => {
  

      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,

            },
          };
          const response = await axios.get('http://localhost:9090/users', config);
          setUsers(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, []);
    
  
    const UserEditButton = ({ user, onEdit }) => (
      <button className='edit_button' onClick={() => onEdit(user)}>Edit</button>
    );
    
    {showEditUser && (
      <UserEdit
        user={userToEdit}
        onClose={() => setShowEditUser(false)}
      />
    )}
    
    
  return (
    <>
   
      <h1 className='title'>Admin Page</h1>
      <Sidebar/>
      <div className='container'>  


         <table className='table_liste_users'>
        <thead>
          <tr>
            <th>CIN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <td className='a_th'><a href='/RegisterNewUser' >Add new user</a></td>
          </tr>
        </thead>
        <tbody>
          {users && users.map(item => (
            <tr key={item.userName} className={item.userName === profile.userName ? 'highlight' : ''}>
              <td>{item.userName}</td>
              <td>{item.userFirstName}</td>
              <td>{item.userLastName}</td>
              <td>{item.role[0].roleName}</td>

             
              
              {item.role[0].roleName === 'User' && (
                <>
                  <td> <UserEditButton user={item} onEdit={handleEditUser} /></td>   
                  <td> <DeleteButton userName={item.userName} className="delete_button"/></td>
                  </>
                )}
            </tr>
          ))}
        </tbody>
       
      </table>
      {showEditUser && (
        <UserEdit
          user={userToEdit}
          onClose={() => setShowEditUser(false)}
        />
      )}
      </div>

   </>
  );
};









const AdminPageWrapper = () => {
  const jwtToken = localStorage.getItem('token');
  if (!jwtToken) {
    return <h1>You need to be <a href="/">Logged In</a> as admin to view this page</h1>;
    
  }

  return <AdminPage />;
}

export default AdminPageWrapper;
