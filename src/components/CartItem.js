import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />
      
      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <div className="cart-item-price">${item.price.toFixed(2)}</div>
        
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="quantity-btn"
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="quantity-input"
              min="1"
              max="10"
            />
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="quantity-btn"
              disabled={item.quantity >= 10}
            >
              +
            </button>
          </div>
          
          <button onClick={handleRemove} className="remove-btn" title="Remove from cart">
            🗑️
          </button>
        </div>
        
        <div className="cart-item-subtotal">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
