import React, { useEffect, useState } from 'react';
import './ListArtist.css';
import cross_icon from '../../assets/cart_cross_icon.png';

const ListArtists = () => {
  // State to store all artists
  const [allArtists, setAllArtists] = useState([]);

  // Function to fetch artist information
  const fetchArtists = async () => {
    try {
      const response = await fetch('http://localhost:5858/allartists');
      const data = await response.json();
      setAllArtists(data);
    } catch (error) {
      console.error('Error fetching artists:', error);
      alert('Failed to fetch artists');
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Function to remove an artist
  const removeArtist = async (id) => {
    try {
      const response = await fetch('http://localhost:5858/removeartist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        // Update the artist list after removal
        const updatedArtists = allArtists.filter((artist) => artist.id !== id);
        setAllArtists(updatedArtists);
      } else {
        throw new Error(responseData.message || 'Failed to remove artist');
      }
    } catch (error) {
      console.error('Error removing artist:', error);
      alert('Failed to remove artist');
    }
  };

  return (
    <div className="list-artists">
      <h1>All Artists</h1>
      <div className="artist-header">
        {/* Artist headers */}
        <p>Artist Name</p>
        <p>Picture</p>
        <p>Bio</p>
        <p>Description of Work</p>
        <p>Remove</p>
      </div>
      <div className="artist-list">
        <hr />
        {/* Display each artist */}
        {allArtists.map((artist) => {
          return (
            <div key={artist.id} className="artist-item">
              <p>{artist.name}</p>
              <img src={artist.picture} alt="" className='list-artist-icon'/>
              <p>{artist.bio}</p>
              <p>{artist.descriptionOfWork}</p>
              {/* Call removeArtist function on click */}
              <img
                onClick={() => {
                  removeArtist(artist.id);
                }}
                className="artist-remove-icon"
                src={cross_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListArtists;
