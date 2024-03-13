import React from 'react'
import "./Navbar.css"
import logo from '../../assets/logo.png'
import admin from '../../assets/admin.png'

const Navbar = () => {
  return (
    <div className='navbar'>
       <img src={logo} alt="" className="nav-logo" />
       <h2>ART-SCAPE ADMIN</h2>
       <img src={admin} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar