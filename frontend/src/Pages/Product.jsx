import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { Breadcrum } from '../components/Breadcrums/Breadcrum';
import { ProductDisplay } from '../components/ProductDisplay/ProductDisplay';
import { RelatedProduct } from '../components/RelatedProducts/RelatedProduct';

export const Product = () => {
  const { all_product, data_product, new_collections } = useContext(ShopContext);
  const { productId } = useParams();

  // Merge all_product, data_product, and new_collections into one array
  const allProducts = [...all_product, ...data_product, ...new_collections];

  // Find the product with the specified productId
  const product = allProducts.find((product) => product.id === Number(productId));

  // Check if product is not undefined before rendering
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product}/>
      <RelatedProduct/>
    </div>
  );
};
