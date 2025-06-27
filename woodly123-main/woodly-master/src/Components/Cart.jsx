import React, { useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [selectedAddress, setSelectedAddress] = useState('saved');
  const [selectedPayment, setSelectedPayment] = useState('Debit Card');

  const [quantities, setQuantities] = useState({
    item1: 0,
    item2: 0,
    item3: 0,
  });

  const [cartItems, setCartItems] = useState(['item1', 'item2', 'item3']);

  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    pin: '',
    state: '',
    country: 'India',
  });

  const [savedNewAddress, setSavedNewAddress] = useState('');

  const prices = {
    item1: 1000,
    item2: 899,
    item3: 1000,
  };

  const updateQuantity = (item, change) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + change),
    }));
  };

  const deleteItem = (item) => {
    const updatedCart = cartItems.filter((i) => i !== item);
    setCartItems(updatedCart);
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[item];
      return newQuantities;
    });
  };

  const emptyCart = () => {
    setCartItems([]);
    setQuantities({});
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const saveNewAddress = () => {
    const { street, city, pin, state, country } = newAddress;
    if (!street || !city || !pin || !state) {
      alert('Please fill all fields');
      return;
    }
    const fullAddress = `${street}, ${city}, ${pin}, ${state}, ${country}`;
    setSavedNewAddress(fullAddress);
    setSelectedAddress('savedNew');
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (prices[item] || 0) * (quantities[item] || 0),
    0
  );
  const delivery = 200;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + delivery + gst;

  return (
    <div className="container">
      <div className="header">
        <div className="logo">Woodly</div>
        <div className="subtitle">Handcrafted with Love & Nature</div>
      </div>

      <div className="checkout-container">
        <div className="payment-form">
          <h2 className="section-title">Delivery Address</h2>

          <div
            className={`saved-address ${selectedAddress === 'saved' ? 'selected' : ''}`}
            onClick={() => setSelectedAddress('saved')}
          >
            <div className="address-header">Home Address</div>
            <div className="address-details">
              woodly<br />
              CraftHouse<br />
              Kerala, India
            </div>
          </div>

          {savedNewAddress && (
            <div
              className={`saved-address ${selectedAddress === 'savedNew' ? 'selected' : ''}`}
              onClick={() => setSelectedAddress('savedNew')}
            >
              <div className="address-header">New Address</div>
              <div className="address-details">{savedNewAddress}</div>
            </div>
          )}

          <div
            className={`saved-address ${selectedAddress === 'new' ? 'selected' : ''}`}
            onClick={() => setSelectedAddress('new')}
          >
            <div className="address-header">+ Add New Address</div>
          </div>

          {selectedAddress === 'new' && (
            <div className="new-address-form">
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleAddressChange}
                  placeholder="_____"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleAddressChange}
                    placeholder="______"
                  />
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input
                    type="text"
                    name="pin"
                    value={newAddress.pin}
                    onChange={handleAddressChange}
                    placeholder="_____"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>State</label>
                  <select
                    name="state"
                    value={newAddress.state}
                    onChange={handleAddressChange}
                  >
                    <option value="">Select State</option>
                    <option>Kerala</option>
                    <option>Tamil Nadu</option>
                    <option>Karnataka</option>
                    <option>Maharashtra</option>
                    <option>Gujarat</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input type="text" value="India" readOnly />
                </div>
              </div>
              <button className="save-address-btn" onClick={saveNewAddress}>
                Save Address
              </button>
            </div>
          )}

          <h2 className="section-title">Payment Method</h2>
          <div className="payment-methods">
            {['Debit Card', 'Credit Card', 'UPI', 'Cash on Delivery'].map((method) => (
              <div
                key={method}
                className={`payment-method ${selectedPayment === method ? 'selected' : ''}`}
                onClick={() => setSelectedPayment(method)}
              >
                <div className="payment-icon" />
                <div>{method}</div>
              </div>
            ))}
          </div>

          {['Debit Card', 'Credit Card'].includes(selectedPayment) && (
            <>
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input type="text" placeholder="Name on Card" />
              </div>
            </>
          )}

          {selectedPayment === 'UPI' && (
            <div className="form-group">
              <label>UPI ID</label>
              <input type="text" placeholder="yourname@paytm" />
            </div>
          )}

          {selectedPayment === 'Cash on Delivery' && (
            <div className="cod-box">
              <p>Cash on Delivery</p>
              <p>Pay when you receive your wooden crafts</p>
            </div>
          )}

          <button className="pay-button">
            Complete Order - ₹{total.toLocaleString()}
          </button>
        </div>

        <div className="order-summary">
          <h3 className="summary-title">Your Cart</h3>

          {cartItems.length === 0 ? (
            <p className="empty-cart-msg">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item, i) => (
                <div className="order-item" key={item}>
                  <img
                    src={['bowl.jpeg', 'board.jpeg', 'box.webp'][i]}
                    alt="Product"
                    className="item-image"
                  />
                  <div className="item-details">
                    <div className="item-name">
                      {['Handcrafted Oak Bowl', 'Wooden Cutting Board', 'Cedar Jewelry Box'][i]}
                    </div>
                    <div className="item-desc">
                      {['Natural finish, food-safe', 'Bamboo, eco-friendly', 'Hand-carved details'][i]}
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item, -1)}>-</button>
                      <span>{quantities[item] || 0}</span>
                      <button onClick={() => updateQuantity(item, 1)}>+</button>
                    </div>
                    <button className="delete-btn" onClick={() => deleteItem(item)}>Remove</button>
                  </div>
                  <div className="item-price">₹{prices[item].toLocaleString()}</div>
                </div>
              ))}

              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={emptyCart}>Empty Cart</button>
              </div>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery:</span>
                <span>₹{delivery}</span>
              </div>
              <div className="summary-row">
                <span>GST (18%):</span>
                <span>₹{gst}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
