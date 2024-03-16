import React, { useContext } from 'react'
import './PlaceOrder.css'
import { ShopContext } from '../../Context/ShopContext';


const PlaceOrder = () => {

     const {getTotalCartAmount} = useContext(ShopContext);

  return (
    <form className='place-order'>
        <div className="place-order-left">
            <h2 className="title">Delevery Information</h2>
            <div className="multi-fields">
                <input type="text" placeholder='First name'/>
                <input type="text" placeholder='Last name'/>
            </div>
            <input type="email" placeholder='Email address'/>
            <input type="text" placeholder='Street'/>
            <div className="multi-fields">
                <input type="text" placeholder='City'/>
                <input type="text" placeholder='State'/>
            </div>
            <div className="multi-fields">
                <input type="text" placeholder='Zip Code'/>
                <input type="text" placeholder='Country'/>
            </div>
            <input type="text" placeholder='Phone' />
        </div>
        <div className="place-order-right">
        <div className="cartitems-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shiping fee</p>
                            <p>${getTotalCartAmount()===0?0:5}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h2>Total</h2>
                            <h3>${getTotalCartAmount()===0?0:getTotalCartAmount()+5}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO PAYMENT</button>
                </div>
        </div>

    </form>
  )
}

export default PlaceOrder