import React, {  useEffect, useState } from 'react'
import './RelatedProducts.css'
import Artitem from '../Item/Artitem'
import LoadingSpinner from '../Loadingspinner/loadspinner'

export const RelatedProduct = () => {

  const [relatedProduct,setRelatedProducts]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  

  useEffect(()=>{
    fetch('http://localhost:5858/explore')
    .then((resp)=>resp.json())
    .then((data)=>{
      setRelatedProducts(data);
      setIsLoading(false);
    })
    .catch((error)=>{
      console.error('Error fetching related data:',error);
      setIsLoading(false);
    });
  }, []);
  
  if(isLoading){
    return <LoadingSpinner/>
  }
  return (
    <div className="relatedproducts">
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
          {relatedProduct.map((item,i) => (
          <Artitem key={i} id={item.id} name={item.name} image={item.image} price={item.price} category={item.category} />
        ))}

        </div>
    </div>
  )
}
