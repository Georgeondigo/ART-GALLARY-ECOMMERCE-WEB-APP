import React, { useContext, useEffect, useState } from 'react';
import './Drawings.css';
import Artitem from '../components/Item/Artitem';
import { ShopContext } from '../Context/ShopContext';
import LoadingSpinner from '../components/Loadingspinner/loadspinner';

export const Drawings = () => {
  const { all_product } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true); // Add loading state and initialize as true

  // Simulating loading delay for demonstration purposes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false after delay
    }, 2000); // Adjust the delay time as needed
    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []);

  // Filter products with the category of "Drawing"
  const drawings = all_product.filter(item => item.category === 'drawing');

  if (isLoading) {
    // Render loading spinner if isLoading is true
    return <LoadingSpinner />;
  }

  return (
    <div className="Drawings">
      <h1>Drawings</h1>
      <div className="shopcategory-products">
        {drawings.map((item, i) => (
          <Artitem key={i} id={item.id} name={item.name} image={item.image} price={item.price} description={item.description} category={item.category} />
        ))}
      </div>
    </div>
  );
};
