import React, { memo } from 'react';
import './ProductList.css';
import ProductCard from './ProductCard';

const ProductList = memo(({ products, onAddToCart, cart, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h2>No Products Found</h2>
        <p>Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const inCart = !!cartItem;
        
        return (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            inCart={inCart}
            onProductClick={onProductClick}
          />
        );
      })}
    </div>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;
