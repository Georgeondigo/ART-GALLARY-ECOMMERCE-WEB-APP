import React, { useState } from 'react';
import './AddArtist.css';
import upload from '../../assets/upload.png';

const AddArtist = () => {
  const [artistImage, setArtistImage] = useState(null);
  const [artworkImage, setArtworkImage] = useState(null);
  const [artistDetails, setArtistDetails] = useState({
    name: "",
    picture: "", // Initially empty as we'll update it after uploading the artist image
    bio: "",
    descriptionOfWork: "",
    artworks: []
  });
  const [artworkDetails, setArtworkDetails] = useState({
    name: "",
    category: "",
    price: "",
    description: ""
  });

  const imageHandler = (e) => {
    setArtistImage(e.target.files[0]);
  }

  const artworkImageHandler = (e) => {
    setArtworkImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setArtistDetails({ ...artistDetails, [e.target.name]: e.target.value });
  }

  const artworkChangeHandler = (e) => {
    setArtworkDetails({ ...artworkDetails, [e.target.name]: e.target.value });
  }

  const addArtwork = async () => {
    try {
      // Upload artwork image
      let artworkFormData = new FormData();
      artworkFormData.append('artworkImage', artworkImage);

      let artworkResponse = await fetch("http://localhost:5858/upload/artwork", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: artworkFormData,
      });
      let artworkData = await artworkResponse.json();

      if (!artworkData.success) {
        throw new Error('Failed to upload artwork image');
      }

      // Create a new artwork object with the artwork details and image URL
      const newArtwork = {
        name: artworkDetails.name,
        category: artworkDetails.category,
        image: artworkData.image_url,
        price: artworkDetails.price,
        description: artworkDetails.description
      };

      // Update the artistDetails state by adding the new artwork to the existing artworks array
      setArtistDetails(prevState => ({
        ...prevState,
        artworks: [...prevState.artworks, newArtwork]
      }));

      // Clear artwork details state
      setArtworkDetails({
        name: "",
        category: "",
        price: "",
        description: ""
      });

      // Clear artwork image state
      setArtworkImage(null);

    } catch (error) {
      console.error('Error adding artwork:', error);
      alert("Failed to add artwork");
    }
  }

  const addArtist = async () => {
    try {
      let artistFormData = new FormData();
      artistFormData.append('artistImage', artistImage);

      // Upload artist image
      let artistResponse = await fetch("http://localhost:5858/upload/artist", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: artistFormData,
      });
      let artistData = await artistResponse.json();

      if (!artistData.success) {
        throw new Error('Failed to upload artist image');
      }

      // Include the artist picture URL in the artist details
      setArtistDetails(prevState => ({
        ...prevState,
        picture: artistData.image_url
      }));

      // Add artist to the database
      let addArtistResponse = await fetch('http://localhost:5858/addartist', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(artistDetails),
      });
      let addArtistData = await addArtistResponse.json();

      if (addArtistData.success) {
        alert("Artist Added");
        
        // Reset artistDetails state
        setArtistDetails({
          name: "",
          picture: "",
          bio: "",
          descriptionOfWork: "",
          artworks: []
        });
  
        // Reset artistImage state
        setArtistImage(null);
      } else {
        throw new Error('Failed to add artist');
      }

      
    } catch (error) {
      console.error('Error adding artist:', error);
      alert("Failed to add artist");
    }
  }

  return (
    <div className='add-artist'>
      <div className="add-artist-itemfield">
        <p>Artist Name</p>
        <input value={artistDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="add-artist-itemfield">
        <p>Artist Bio</p>
        <input value={artistDetails.bio} onChange={changeHandler} type="text" name='bio' placeholder='Type here' />
      </div>
      <div className="add-artist-itemfield">
        <p>Description of Work</p>
        <input value={artistDetails.descriptionOfWork} onChange={changeHandler} type="text" name='descriptionOfWork' placeholder='Type here' />
      </div>
      <div className="add-artist-itemfield">
        <p>Upload Artist Picture</p>
        <label htmlFor="artist-file-input">
          <img src={artistImage ? URL.createObjectURL(artistImage) : upload} className='add-artist-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='artistImage' id='artist-file-input' hidden />
      </div>
      <div className="add-artist-itemfield">
        <h3>Add Artwork</h3>
        <div className="add-artist-itemfield">
          <p>Artwork Name</p>
          <input value={artworkDetails.name} onChange={artworkChangeHandler} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-artist-itemfield">
          <p>Category</p>
          <input value={artworkDetails.category} onChange={artworkChangeHandler} type="text" name='category' placeholder='Type here' />
        </div>
        <div className="add-artist-itemfield">
          <p>Price</p>
          <input value={artworkDetails.price} onChange={artworkChangeHandler} type="text" name='price' placeholder='Type here' />
        </div>
        <div className="add-artist-itemfield">
          <p>Description</p>
          <input value={artworkDetails.description} onChange={artworkChangeHandler} type="text" name='description' placeholder='Type here' />
        </div>
        <div className="add-artist-itemfield">
          <p>Upload Artwork Image</p>
          <label htmlFor="artwork-file-input">
            <img src={artworkImage ? URL.createObjectURL(artworkImage) : upload} className='add-artist-thumbnail-img' alt="" />
          </label>
          <input onChange={artworkImageHandler} type="file" name='artworkImage' id='artwork-file-input' hidden />
        </div>
        <button onClick={addArtwork} className='add-artist-btn'>Add Artwork</button>
      </div>
      <button onClick={addArtist} className='add-artist-btn'>ADD</button>
    </div>
  );
}

export default AddArtist;
