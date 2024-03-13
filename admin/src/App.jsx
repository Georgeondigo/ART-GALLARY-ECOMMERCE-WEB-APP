import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Admin from './pages/Admin/Admin'
import './index.css'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Admin/>
    </div>
  )
}

export default App