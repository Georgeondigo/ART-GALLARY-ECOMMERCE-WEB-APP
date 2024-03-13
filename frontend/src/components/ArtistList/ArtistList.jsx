import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../Loadingspinner/loadspinner';
import './ArtistList.css';

export const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track loading status

  useEffect(() => {
    fetch('http://localhost:5858/allartists')
      .then((resp) => resp.json())
      .then((data) => {
        setArtists(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching artists:', error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  // Render loading spinner if loading is true
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='artistlist'>
      <h1>Meet our Artists</h1>
      <div className="artist-list">
        {artists.map(artist => (
          <Link to={`/artist/${artist.id}`} key={artist.id}>
            <img src={artist.picture} alt={artist.name} />
            <p>{artist.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
