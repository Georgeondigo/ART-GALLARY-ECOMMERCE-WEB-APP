import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const PlaceOrder = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

 

     const {getTotalCartAmount, all_product, cartItems,userId ,getDefaultCart} = useContext(ShopContext);

     const navigate = useNavigate();

     const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        all_product.map(item => {
            if (cartItems[item.id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item.id];
                orderItems.push(itemInfo);
            }
            return null; // Explicitly return null to satisfy array-callback-return
        });
        let orderData = {
            userId: userId,
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 5,
            defaultCartData: getDefaultCart,
        };
        let response = await axios.post("http://localhost:5858/placeorder", orderData, { 
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            } 
        });
    
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {

        const authToken = localStorage.getItem('auth-token');
        if (!authToken) {
            toast.error("To place an order, sign in first");
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [ getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
            <h2 className="title">Delevery Information</h2>
            <div className="multi-fields">
                <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
            </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
            <div className="multi-fields">
                <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
            </div>
            <div className="multi-fields">
                 <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                 <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
            </div>
            <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
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
                    <button className='place-order-submit' type='submit'>Proceed To Payment</button>
                </div>
        </div>

    </form>
  )
}

export default PlaceOrder