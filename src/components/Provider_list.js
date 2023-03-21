import React from 'react'
import Sidebar from './AdminPageSideBar'
function provider_list() {
    const userData = JSON.parse(localStorage.getItem('profile'));
    const userPhrase = `This is the  ${userData.role[0].roleName}'s providers list Your CIN is ${userData.userName} `;
    return (
        <div>
            <Sidebar/>
           <h1> {userPhrase} </h1>
        </div>
    )
}

export default provider_list
