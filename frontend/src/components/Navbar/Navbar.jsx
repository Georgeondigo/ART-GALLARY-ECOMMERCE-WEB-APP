import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import shopping_cart from '../Assets/shopping_cart.png'
import profile_icon from '../Assets/admin.png'
import logout_icon from '../Assets/logout_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import bag_icon from '../Assets/bag_icon.png'
import { ShopContext } from '../../Context/ShopContext'

 const Navbar = () => {
  
    const [menu,setMenu] = useState("Home"); 
    const{getTotalCartItems}=useContext(ShopContext);
    const navigate = useNavigate();

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
        <Link to='/cart'><img src={shopping_cart} alt="" /></Link>
        <div className="nav-cart-count">
            {getTotalCartItems()}
        </div>

        {!localStorage.getItem('auth-token') ? 
        <div>
             <Link to="/login"><button>Login</button></Link>
         </div>
            :
           <div className='navbar-profile'>
            <img src={profile_icon} alt="" className='profileicon'/>
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <img src={bag_icon} alt="" /> <p>Orders</p></li>
               <hr />
              <li onClick={() => {
             localStorage.removeItem('auth-token');
             window.location.replace("/");
            }}> <img src={logout_icon} alt="" /> <p>Logout</p></li> 
            </ul>
  </div>
}

    
    </div>
    </div>
  )
}

export default Navbar;
