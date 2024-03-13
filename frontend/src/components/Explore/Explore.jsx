import React, { useEffect, useState } from 'react';
import './Explore.css';
import Artitem from '../Item/Artitem';
import LoadingSpinner from '../Loadingspinner/loadspinner';

export const Explore = () => {
  const [explore, setExplore] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state and initialize as true

  useEffect(() => {
    fetch('http://localhost:5858/explore')
      .then((resp) => resp.json())
      .then((data) => {
        setExplore(data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching explore data:', error);
        setIsLoading(false); // Set loading to false on error
      });
  }, []);

  if (isLoading) {
    // Render loading spinner if isLoading is true
    return <LoadingSpinner />;
  }

  return (
    <div className='explore'>
      <h1>EXPLORE</h1>
      <hr />
      <p>UNIQUE NEW ART COLLECTIONS</p>
      <hr />
      <div className="explore-item">
        {explore.map((item, i) => (
          <Artitem key={i} id={item.id} name={item.name} image={item.image} price={item.price} category={item.category} />
        ))}
      </div>
    </div>
  );
}
