import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  const { addToCart, isInCart } = useCart();

  const getNutritionGrade = () => {
    const grade = product.nutrition_grades || product.nutrition_grade_fr || 'unknown';
    return grade.toUpperCase();
  };

  const getImageUrl = () => {
    return product.image_url || product.image_front_url || product.image_small_url || '/placeholder.png';
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <div className="product-image">
        <img 
          src={getImageUrl()} 
          alt={product.product_name || 'Product'}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.product_name || 'Unknown Product'}</h3>
        <p className="product-category">{product.categories_tags?.[0]?.replace(/^en:/, '') || 'Unknown Category'}</p>
        {product.ingredients_text && (
          <p className="product-ingredients">
            Ingredients: {product.ingredients_text.substring(0, 100)}
            {product.ingredients_text.length > 100 ? '...' : ''}
          </p>
        )}
        <div className="product-card-footer">
          <div className="nutrition-grade">
            <span className={`grade-badge grade-${getNutritionGrade().toLowerCase()}`}>
              {getNutritionGrade()}
            </span>
          </div>
          <button 
            className={`add-to-cart-btn ${isInCart(product.code) ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
          >
            {isInCart(product.code) ? '✓ In Cart' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
