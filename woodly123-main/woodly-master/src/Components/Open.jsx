import React from 'react';
import './open.css';
import products from '../data/product';

const Open = () => {
  return (
    <div className="home-container">
      {/* Background image and text */}
      <div className="image-container">
        <img src="bg1.jpg" alt="Wood Background" className="background-image" />
        <div className="image-text">
          <div className="main-text">Going eco has never been Easier</div>
          <div className="sub-text">Make a Difference With Every Purchase, Shop Sustainable.</div>
        </div>
      </div>

      {/* Product Section */}
      <div className="product-section">
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-img" />
              <h3>{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button className="buy-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Open;