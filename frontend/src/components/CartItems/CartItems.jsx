import React, { useContext, useEffect, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import LoadingSpinner from '../Loadingspinner/loadspinner';
import { useNavigate } from 'react-router-dom'

export const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [isLoading, setIsLoading] = useState(true); // Add loading state and initialize as true

    const navigate = useNavigate();

    useEffect(() => {
        // Simulate loading delay for demonstration purposes
        const timeout = setTimeout(() => {
            setIsLoading(false); // Set loading to false after delay
        }, 2000); // Adjust the delay time as needed
        return () => clearTimeout(timeout); // Clear timeout on component unmount
    }, []);

    console.log("all_product:", all_product);
    console.log("cartItems:", cartItems);

    if (isLoading) {
        // Render loading spinner if isLoading is true
        return <LoadingSpinner />;
    }

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product && all_product.map((e) => {
                console.log("e:", e);

                if (cartItems && cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main " key={e.id}>
                                <img src={e.image} alt="" className="carticon-product-icon" />
                                <p>{e.name}</p>
                                <p>${e.price}</p>
                                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                <p>{e.price * cartItems[e.id]}</p>
                                <img src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
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
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()===0?0:getTotalCartAmount()+5}</h3>
                        </div>
                    </div>
                    <button onClick={()=>{navigate('/order')}}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
