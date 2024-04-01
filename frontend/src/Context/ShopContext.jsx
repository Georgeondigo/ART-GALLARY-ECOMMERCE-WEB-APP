import React, { createContext, useState, useEffect } from 'react';
import data_product from '../components/Assets/data';
import new_collections from '../components/Assets/new_collections';
import artistData from '../components/Assets/artists';
import axios from 'axios'
import { jwtDecode } from "jwt-decode";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
}


export const ShopContextProvider = (props) => {

    const [all_product,setAll_Product] =useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:5858/allproducts')
            .then(response => { setAll_Product(response.data); })
            .catch(error => { console.error('Error fetching all products:', error); });
    
            fetchUserId();

        if (localStorage.getItem('auth-token')) {
            axios.post('http://localhost:5858/getcart', {}, {
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                }
            })
            .then(response => { setCartItems(response.data); })
            .catch(error => { console.error('Error fetching cart:', error); });
        }
    }, []);

   

    const fetchUserId = () => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            const decoded = jwtDecode(token);
            const userId = decoded.user.id;
            setUserId(userId);
        } else {
            console.error('User ID not found in token');
        }
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    
        if (localStorage.getItem('auth-token')) {
            axios.post('http://localhost:5858/addtocart', { itemId }, {
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({ itemId }) // Include itemId in the request body
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
            });
        }
    };

    

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    
        if (localStorage.getItem('auth-token')) {
            axios.post('http://localhost:5858/removefromcart', { itemId }, {
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({ itemId }) // Include itemId in the request body
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error removing from cart:', error);
            });
        }
    };


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {userId, getTotalCartItems, getTotalCartAmount, all_product, cartItems, data_product, new_collections, addToCart, removeFromCart, artistData ,setCartItems};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
