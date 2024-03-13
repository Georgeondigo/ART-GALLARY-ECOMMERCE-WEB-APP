import React from 'react'
import './Artitem.css'
import { Link } from 'react-router-dom'

const Artitem = (props) => {
  return (
    <div className="item">
       <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt=""/></Link> 
          <p>{props.name}</p>
     <div className="item-price">
         ${props.price}  
           </div>
     <div className="item-category">
             {props.category}
                </div>
                <div>{props.description}</div>
                <div>{props.artist}</div>
            </div>
            
  )
}

export default Artitem