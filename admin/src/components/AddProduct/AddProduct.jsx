import React, { useState } from 'react';
import './AddProduct.css';
import upload from '../../assets/upload.png';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    artist: "",
    category: "Painting"
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
  
    let formData = new FormData();
    formData.append('productImage', image);
  
    await fetch("http://localhost:5858/upload/product", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
  
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:5858/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            alert("Artwork Added");
            // Reset the form after successful addition
            setProductDetails({
              name: "",
              image: "",
              price: "",
              description: "",
              artist: "",
              category: "Painting",
            });
            setImage(false); // Reset the image selection
          } else {
            alert("Failed");
          }
        });
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Art Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-itemfield">
        <div className="addproduct-price">
          <p>Price</p>
          <div className="addproduct-itemfield">
            <input value={productDetails.price} onChange={changeHandler} type="text" name='price' placeholder='Type here' />
          </div>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <div className="addproduct-description">
          <p>Description</p>
          <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <div className="addproduct-arist">
          <p>Artist Name</p>
          <input value={productDetails.artist} onChange={changeHandler} type="text" name='artist' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Art Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector' >
          <option value="Painting">Painting</option>
          <option value="photograph">Photograph</option>
          <option value="drawing">Drawing</option>
          <option value="DigitalArt">DigitalArt</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Upload</p>
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload} className='addproduuct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={() => { Add_product() }} className='addproduct-btn'> ADD</button>
    </div>
  );
};

export default AddProduct;
