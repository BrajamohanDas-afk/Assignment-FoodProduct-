import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const getImageUrl = (product) => {
    return product.image_url || product.image_front_url || product.image_small_url || 'https://via.placeholder.com/80x80?text=No+Image';
  };

  return (
    <>
      <button className="cart-button" onClick={() => setIsOpen(true)}>
        Cart ({getCartTotal()})
      </button>

      {isOpen && (
        <div className="cart-overlay" onClick={() => setIsOpen(false)}>
          <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.code} className="cart-item">
                      <img src={getImageUrl(item)} alt={item.product_name} />
                      <div className="cart-item-info">
                        <h4>{item.product_name || 'Unknown Product'}</h4>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.code, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.code, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button className="remove-button" onClick={() => removeFromCart(item.code)}>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <p>Total Items: {getCartTotal()}</p>
                  <button className="clear-cart-button" onClick={clearCart}>
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
