import React from 'react'
import Sidebar from './AdminPageSideBar'

function UserPage() {
    const userData = JSON.parse(localStorage.getItem('profile'));
    const userPhrase = `Welcome  ${userData.userFirstName} Your CIN is ${userData.userName} `;
    console.log(userPhrase);



    
    return (
        <div>
        <Sidebar/>
        <h1>This is a user page {userPhrase}</h1>            
        </div>
    )
}


const UserPageWrapper = () => {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      return <h1>You need to be <a href="/">Logged In</a> as user to view this page</h1>;
      
    }
  
    return <UserPage />;
  }
  
  export default UserPageWrapper;