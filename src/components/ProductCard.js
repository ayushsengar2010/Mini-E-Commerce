import React, { memo } from 'react';
import './ProductCard.css';

const ProductCard = memo(({ product, onAddToCart, inCart, onProductClick }) => {
  const { title, price, category, image, rating } = product;
  
  // Simulating stock status (in a real app, this would come from the API)
  const isInStock = rating.count > 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isInStock) {
      onAddToCart(product);
    }
  };

  const handleCardClick = () => {
    onProductClick(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-wrapper">
        <img src={image} alt={title} className="product-image" />
        <span className={`stock-badge ${isInStock ? 'in-stock' : 'out-of-stock'}`}>
          {isInStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      
      <div className="product-details">
        <div className="product-category">{category}</div>
        <h3 className="product-title">{title}</h3>
        
        <div className="product-footer">
          <div className="product-price">${price.toFixed(2)}</div>
          <button
            className={`add-to-cart-btn ${!isInStock ? 'disabled' : ''} ${inCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            disabled={!isInStock}
          >
            {inCart ? 'Added ✓' : isInStock ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
