import React, { useContext, useEffect, useState } from 'react';
import './Paintings.css';
import Artitem from '../components/Item/Artitem';
import { ShopContext } from '../Context/ShopContext';
import LoadingSpinner from '../components/Loadingspinner/loadspinner';

export const Paintings = () => {
  const { all_product } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true); // Add loading state and initialize as true

  // Simulating loading delay for demonstration purposes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false after delay
    }, 2000); // Adjust the delay time as needed
    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []);

  // Filter products with the category of "Painting"
  const paintings = all_product.filter(item => item.category === 'Painting');

  if (isLoading) {
    // Render loading spinner if isLoading is true
    return <LoadingSpinner />;
  }

  return (
    <div className="Paintings">
      <h1>Paintings</h1>
      <div className="shopcategory-products">
        {paintings.map((item, i) => (
          <Artitem key={i} id={item.id} name={item.name} image={item.image}  price={item.price} category={item.category} />
        ))}
      </div>
    </div>
  );
};
