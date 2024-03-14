import React, { useContext, useEffect, useState } from 'react';
import './Photographs.css';
import Artitem from '../components/Item/Artitem';
import { ShopContext } from '../Context/ShopContext';
import LoadingSpinner from '../components/Loadingspinner/loadspinner';

export const Photographs = () => {
  const { all_product } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true); // Add loading state and initialize as true

  // Simulating loading delay for demonstration purposes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false after delay
    }, 2000); // Adjust the delay time as needed
    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []);

  // Filter products with the category of "Photograph"
  const photographs = all_product.filter(item => item.category === 'photograph');

  if (isLoading) {
    // Render loading spinner if isLoading is true
    return <LoadingSpinner />;
  }

  return (
    <div className="Photographs">
      <h1>Photographs</h1>
      <div className="shopcategory-products">
        {photographs.map((item, i) => (
          <Artitem key={i} id={item.id} name={item.name} image={item.image} price={item.price} description={item.description} category={item.category} />
        ))}
      </div>
    </div>
  );
};
