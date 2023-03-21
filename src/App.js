import './App.css';
import { BrowserRouter , Route ,Routes } from 'react-router-dom';
import Login from './components/Login';
import UserPageWrapper from './components/UserPage'
import AdminPageWrapper from './components/AdminPage'
import React, { useEffect } from 'react';
import RegisterNewUser from './components/RegisterNewUser'
import Provider_list from './components/Provider_list'
import Dashboard from './components/Dashboard'
import Administration from './components/Administration';
import Sidebar from './components/AdminPageSideBar';
import Home from './components/Home';
function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminPageWrapper/>}/>
          <Route path="/user" element={<UserPageWrapper/>}/>
          <Route path="/RegisterNewUser" element={<RegisterNewUser/>}/>
          <Route path="/ProviderList" element={<Provider_list/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
      </div>
      );   
    
}

export default App;
