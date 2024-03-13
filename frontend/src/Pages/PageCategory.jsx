import React, { useEffect, useState } from 'react';
import { Paintings } from './Paintings';
import { Photographs } from './Photographs';
import { Drawings } from './Drawings';
import { DigitalArt } from './DigitalArt';
import LoadingSpinner from '../components/Loadingspinner/loadspinner';

export const PageCategory = () => {
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
    <div>
      <Paintings />
      <Photographs />
      <Drawings />
      <DigitalArt />
    </div>
  );
};
