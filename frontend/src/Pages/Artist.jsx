import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Artist.css'
import LoadingSpinner from '../components/Loadingspinner/loadspinner';

 export const Artist = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5858/allartists`)
      .then((resp) => resp.json())
      .then((data) => {
        const selectedArtist = data.find((artist) => artist.id === parseInt(artistId));
        if (selectedArtist) {
          setArtist(selectedArtist);
        } else {
          console.error('Artist not found');
        }
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching artists:', error);
        setIsLoading(false); // Set loading to false on error
      });
  }, [artistId]);

  if (isLoading) {
    // Render loading spinner if isLoading is true
    return <LoadingSpinner />;
  }

  if (!artist) {
    return <div>Artist not found.</div>;
  }

  return (
    <div className='artist'>
      <h1 className='title'>{artist.name}</h1>

      <div className='artist-info'>
        <img src={artist.picture} alt={artist.name} />
        <p>{artist.bio}</p>
      </div>

      <h2>Artworks</h2>
      <div className='artist-artworks'>
        {artist.artworks.map((artwork) => (
          <div key={artwork.id} className='artwork-item'>
           
            <img className='artwork-image' src={artwork.image} alt={artwork.name} />
            <h3>{artwork.name}</h3>
            <p>{artwork.description}</p>
            <p>Category: {artwork.category}</p>
            <p>Price: ${artwork.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artist;