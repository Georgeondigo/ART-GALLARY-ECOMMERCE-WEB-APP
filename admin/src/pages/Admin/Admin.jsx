import React from 'react'
import './Admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Route,Routes } from 'react-router-dom'
import AddProduct from '../../components/AddProduct/AddProduct'
import ListProducts from '../../components/ListProducts/ListProducts'
import AddArtist from '../../components/AddArtist/AddArtist'
import ListArtist from '../../components/ListArtist/ListArtist'
import Dashboard from '../../components/Dashboard/Dashboard'


const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/addproduct' element={<AddProduct/>} />
            <Route path='/allproducts' element={<ListProducts/>} />
            <Route path='/addartist' element={<AddArtist/>} />
            <Route path='/allartists' element={<ListArtist/>} />
        </Routes>
    </div>
  )
}

export default Admin