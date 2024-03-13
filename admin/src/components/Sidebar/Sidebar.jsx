import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addproduct from '../../assets/addproduct.png'
import listproducts from '../../assets/listproducts.png'
import addartist from '../../assets/addartist.png'
import listartist from '../../assets/listartist.png'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={addproduct} alt="" />
            <p>Add Product</p>
        </div>
        </Link>
        <Link to={'/allproducts'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={listproducts} alt="" />
            <p>Product List</p>
        </div>
        </Link>
        <Link to={'/addartist'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={addartist} alt="" />
            <p>Add Artist</p>
        </div>
        </Link>
        <Link to={'/allartists'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={listartist} alt="" />
            <p>Artist List</p>
        </div>
        </Link>
    </div>
  )
}

export default Sidebar