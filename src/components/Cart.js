import React, { memo } from 'react';
import './Cart.css';
import CartItem from './CartItem';

const Cart = memo(({ cart, onRemoveItem, onUpdateQuantity, total }) => {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2 className="cart-title">Shopping Cart</h2>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p>Your cart is empty</p>
          <small>Add some products to get started!</small>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2 className="cart-title">
        Shopping Cart
        <span className="cart-count">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
      </h2>

      <div className="cart-items">
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span className="summary-value">${total.toFixed(2)}</span>
        </div>
        <div className="summary-row total-row">
          <span>Total:</span>
          <span className="summary-total">${total.toFixed(2)}</span>
        </div>
        <button className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
});

Cart.displayName = 'Cart';

export default Cart;
