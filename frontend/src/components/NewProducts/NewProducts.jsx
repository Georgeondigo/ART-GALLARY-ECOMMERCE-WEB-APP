import React, { useEffect, useState } from 'react';
import './NewProducts.css';
import Artitem from '../Item/Artitem';
import LoadingSpinner from '../Loadingspinner/loadspinner';

export const NewProducts = () => {
  const [newCollection, setNewCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state and initialize as true

  useEffect(() => {
    fetch('http://localhost:5858/newcollection')
      .then((resp) => resp.json())
      .then((data) => {
        setNewCollection(data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching new collection:', error);
        setIsLoading(false); // Set loading to false on error
      });
  }, []);

  if (isLoading) {
    // Render loading spinner if isLoading is true
    return <LoadingSpinner />;
  }

  return (
    <div className="new-products">
      <h1>THE LATEST</h1>
      <hr />
      <p>IN OUR ART GALLARY</p>
      <div className="products">
        {newCollection.map((item, i) => (
          <Artitem key={i} id={item.id} name={item.name} image={item.image} price={item.price} category={item.category} />
        ))}
      </div>
    </div>
  );
}
