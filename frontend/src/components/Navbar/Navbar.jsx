import React, { useContext, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import shopping_cart from '../Assets/shopping_cart.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

 const Navbar = () => {
  
    const [menu,setMenu] = useState("Home"); 
    const{getTotalCartItems}=useContext(ShopContext);

    return (
    <div className='navbar'>
    <div className="nav-logo">
        <img src={logo} alt="" />
        <p>ART-SCAPE</p>
    </div>
    <ul className="nav-menu">
        <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("art")}}><Link style={{textDecoration:'none'}} to='/art'>Art</Link>{menu==="art"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("artist")}}><Link style={{textDecoration:'none'}} to='/artist'>Artist</Link>{menu==="artist"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("about")}}><Link style={{textDecoration:'none'}} to='/about'>About</Link>{menu==="about"?<hr/>:<></>}</li>
    </ul>
    <div className="nav-login-cart">
    {localStorage.getItem('auth-token')? 
            <button onClick={()=>{localStorage.removeItem('auth-token');
            window.location.replace("/")}}>Logout</button> : 
            <Link to="/login"><button>Login</button></Link>
            }
    <Link to='/cart'><img src={shopping_cart} alt="" /></Link>
        <div className="nav-cart-count">
            {getTotalCartItems()}
        </div>
    </div>
    </div>
  )
}

export default Navbar;
