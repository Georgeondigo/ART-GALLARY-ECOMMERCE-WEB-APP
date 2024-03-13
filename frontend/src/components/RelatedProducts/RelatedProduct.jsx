import React, { useContext } from 'react'
import './RelatedProducts.css'
import Artitem from '../Item/Artitem'
import { ShopContext } from '../../Context/ShopContext'

export const RelatedProduct = () => {
  const { data_product } = useContext(ShopContext);

  return (
    <div className="relatedproducts">
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
          {data_product.map((item,i) => (
          <Artitem key={i} id={item.id} name={item.name} image={item.image} price={item.price} category={item.category} />
        ))}

        </div>
    </div>
  )
}
