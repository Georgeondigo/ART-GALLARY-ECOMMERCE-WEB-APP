import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './categories.css';

export const Categories = () => {
  return (
    <div className='Categories'>
      <h2>CATEGORIES</h2>
        <div className="category-list">
        <Link style={{textDecoration:'none'}} to='/paintings'><button>Paintings</button></Link>
        <Link style={{textDecoration:'none'}} to='/drawings'><button>Drawings</button></Link>
        <Link style={{textDecoration:'none'}} to='/photographs'><button>Photographs</button></Link>
        <Link style={{textDecoration:'none'}} to='/digitalArt'><button>DigitalArt</button></Link>
    </div>
    </div>
  )
}
