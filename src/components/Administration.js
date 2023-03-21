import React from 'react'
import Sidebar from './AdminPageSideBar';
function Administration() {
    const userData = JSON.parse(localStorage.getItem('profile'));
    const userPhrase = `This is the Administration menu for ${userData.role[0].roleName}s , Your CIN is ${userData.userName} `;

    return (
        <div>
            <Sidebar/>
            <h1>{userPhrase}</h1>
        </div>
    )
}

export default Administration
