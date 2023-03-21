import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useState,useRef,useEffect } from 'react';
import '../Style/AdminSideBar.css'
import { Link, useLocation } from 'react-router-dom';
import { createPopper } from '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const Sidebar = () => {








  const location = useLocation();
  const { pathname } = location;
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const userData = JSON.parse(localStorage.getItem('profile'));

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
function handleLogout() { 
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  function handleDropdownToggle() {
    setShowDropdown(!showDropdown);
  }
  

    return (
        <>
         <button className="toggle_button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h3 className='userFirstName'>{userData.userFirstName}</h3>
        <ul className='nav_elements'>   
        <li><Link to='/Dashboard' className={location.pathname === '/Dashboard' ? 'active' : ''}>Dashboard</Link></li>
        <li><Link to="/ProviderList" className={location.pathname === '/ProviderList' ? 'active' : ''}>Providers List</Link></li>         
          {userData.role[0].roleName === 'Admin' && (        

        <li>
         
          <Link to="/admin" >Administration</Link>
          <ul>
    <Link  to="/admin">User Profile</Link>
    </ul>
  
           </li>         
        )}          
        </ul>
        <button className="logout_btn" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/>&nbsp;&nbsp;Logout</button>
      </div>
      </>
    );
 

  };
  
  export default Sidebar;
