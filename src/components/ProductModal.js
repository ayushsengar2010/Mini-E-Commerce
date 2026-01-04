import React, { useEffect } from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  const isInStock = product.rating.count > 0;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="modal-body">
          <div className="modal-image-section">
            <img src={product.image} alt={product.title} className="modal-image" />
          </div>
          
          <div className="modal-details-section">
            <div className="modal-category">{product.category}</div>
            <h2 className="modal-title">{product.title}</h2>
            
            <div className="modal-rating">
              <span className="rating-stars">
                {'⭐'.repeat(Math.round(product.rating.rate))}
              </span>
              <span className="rating-text">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            
            <div className="modal-price">${product.price.toFixed(2)}</div>
            
            <div className="modal-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="modal-stock">
              <span className={`stock-indicator ${isInStock ? 'available' : 'unavailable'}`}>
                {isInStock ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
            </div>
            
            <button
              className={`modal-add-to-cart ${!isInStock ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!isInStock}
            >
              {isInStock ? 'Add to Cart' : 'Currently Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
