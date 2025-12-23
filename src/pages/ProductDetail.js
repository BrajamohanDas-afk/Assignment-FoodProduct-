import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchProductByBarcode } from '../services/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './ProductDetail.css';

const ProductDetail = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await searchProductByBarcode(barcode);
      setProduct(data);
      setLoading(false);
    };

    if (barcode) {
      fetchProduct();
    }
  }, [barcode]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Products
        </button>
        <div className="no-product">
          <h2>Product not found</h2>
          <p>The product with barcode {barcode} could not be found.</p>
        </div>
      </div>
    );
  }

  const getNutritionGrade = () => {
    const grade = product.nutrition_grades || product.nutrition_grade_fr || 'unknown';
    return grade.toUpperCase();
  };

  const getImageUrl = () => {
    return product.image_url || product.image_front_url || 'https://via.placeholder.com/400x400?text=No+Image';
  };

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Products
      </button>

      <div className="product-detail">
        <div className="product-detail-image">
          <img src={getImageUrl()} alt={product.product_name || 'Product'} />
        </div>

        <div className="product-detail-info">
          <h1>{product.product_name || 'Unknown Product'}</h1>

          {barcode && (
            <div className="product-section">
              <h3>Barcode</h3>
              <p>{barcode}</p>
            </div>
          )}

          {product.brands && (
            <div className="product-section">
              <h3>Brand</h3>
              <p>{product.brands}</p>
            </div>
          )}

          {product.categories && (
            <div className="product-section">
              <h3>Category</h3>
              <p>{product.categories}</p>
            </div>
          )}

          {product.ingredients_text && (
            <div className="product-section">
              <h3>Ingredients</h3>
              <p className="ingredients-text">{product.ingredients_text}</p>
            </div>
          )}

          {product.nutriments && (
            <div className="product-section">
              <h3>Nutritional Values (per 100g)</h3>
              <table className="nutrition-table">
                <tbody>
                  {product.nutriments.energy && (
                    <tr>
                      <td>Energy</td>
                      <td>{product.nutriments.energy} kJ ({product.nutriments['energy-kcal']} kcal)</td>
                    </tr>
                  )}
                  {product.nutriments.fat !== undefined && (
                    <tr>
                      <td>Fat</td>
                      <td>{product.nutriments.fat} g</td>
                    </tr>
                  )}
                  {product.nutriments.carbohydrates !== undefined && (
                    <tr>
                      <td>Carbohydrates</td>
                      <td>{product.nutriments.carbohydrates} g</td>
                    </tr>
                  )}
                  {product.nutriments.proteins !== undefined && (
                    <tr>
                      <td>Proteins</td>
                      <td>{product.nutriments.proteins} g</td>
                    </tr>
                  )}
                  {product.nutriments.salt !== undefined && (
                    <tr>
                      <td>Salt</td>
                      <td>{product.nutriments.salt} g</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="product-section">
            <h3>Nutrition Grade</h3>
            <div className="grade-container">
              <span className={`grade-badge-large grade-${getNutritionGrade().toLowerCase()}`}>
                {getNutritionGrade()}
              </span>
            </div>
          </div>

          {product.labels && (
            <div className="product-section">
              <h3>Labels</h3>
              <div className="labels">
                {product.labels.split(',').map((label, index) => (
                  <span key={index} className="label-tag">{label.trim()}</span>
                ))}
              </div>
            </div>
          )}

          <div className="product-section">
            <button 
              className={`add-to-cart-btn-large ${isInCart(product.code) ? 'in-cart' : ''}`}
              onClick={() => addToCart(product)}
            >
              {isInCart(product.code) ? '✓ Added to Cart' : '🛒 Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
