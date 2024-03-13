import React, { useState, useEffect } from 'react';
import './Hero.css';
import { Link } from 'react-router-dom'; // Remove NavLink import if not used
import hero_image from '../Assets/hero_image.jpg';
import LoadingSpinner from '../Loadingspinner/loadspinner';

export const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>SHOP OUR </h2> 
        <h2>ART COLLECTIONS</h2>
        <div>Explore our various art collections</div>
        <Link style={{textDecoration:'none'}} to='/art'><button><span>Explore</span></button></Link>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};
