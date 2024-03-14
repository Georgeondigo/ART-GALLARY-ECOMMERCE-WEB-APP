import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import LoadingSpinner from '../Loadingspinner/loadspinner'; // Ensure correct path to LoadingSpinner component

export const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [isLoading, setIsLoading] = useState(true); // Add loading state and initialize as true

    // Simulating loading delay for demonstration purposes
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false); // Set loading to false after delay
        }, 2000); // Adjust the delay time as needed
        return () => clearTimeout(timeout); // Clear timeout on component unmount
    }, []);

    if (isLoading) {
        // Render loading spinner if isLoading is true
        return <LoadingSpinner />;
    }

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>122</p>
                </div>
                <div className="productdisplay-right-price">
                    ${product.price}
                </div>
                <div className="productdisplay-right-description">
                    <p>{product.description}</p>
                </div>
                <div className="productdisplay-right-artist">
                    <p>{product.artist}</p>
                </div>
                <button className="button" onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className="productdisplay-right-category">
                    <span>ArtWork Category : {product.category}</span>
                </p>
            </div>
        </div>
    );
};
