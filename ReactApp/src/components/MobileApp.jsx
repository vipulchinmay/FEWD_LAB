import React, { useState } from 'react';

// Component for user input
const MobileInput = ({ onAddMobile }) => {
  const [mobileData, setMobileData] = useState({
    company: '',
    model: '',
    price: '',
    color: '',
    storage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMobileData({
      ...mobileData,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMobile(mobileData);
    // Reset form
    setMobileData({
      company: '',
      model: '',
      price: '',
      color: '',
      storage: ''
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Mobile Phone</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Company:</label>
            <input
              type="text"
              name="company"
              value={mobileData.company}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Model:</label>
            <input
              type="text"
              name="model"
              value={mobileData.model}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Price ($):</label>
            <input
              type="number"
              name="price"
              value={mobileData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Color:</label>
            <input
              type="text"
              name="color"
              value={mobileData.color}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Storage (GB):</label>
            <input
              type="text"
              name="storage"
              value={mobileData.storage}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Mobile
        </button>
      </form>
    </div>
  );
};

// Component to display mobile phone details with discounts
const MobileDisplay = ({ mobiles }) => {
  // Function to apply discount for iPhones
  const calculatePrice = ({ company, model, price }) => {
    // Case-insensitive check for iPhone
    const isIphone = company.toLowerCase() === 'apple' && 
                    model.toLowerCase().includes('iphone');
    
    if (isIphone) {
      const discountedPrice = price * 0.8; // 20% discount
      return {
        originalPrice: price,
        discountedPrice,
        discount: price - discountedPrice,
        isDiscounted: true
      };
    }
    
    return {
      originalPrice: price,
      discountedPrice: price,
      discount: 0,
      isDiscounted: false
    };
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Mobile Phone Details</h2>
      {mobiles.length === 0 ? (
        <p className="text-gray-500">No mobile phones added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mobiles.map((mobile, index) => {
            const { company, model, price, color, storage } = mobile;
            const { originalPrice, discountedPrice, discount, isDiscounted } = calculatePrice(mobile);
            
            return (
              <div key={index} className="border rounded-lg p-4 shadow">
                <h3 className="font-bold text-lg">{company} {model}</h3>
                <div className="mt-2">
                  <p><span className="font-medium">Storage:</span> {storage} GB</p>
                  <p><span className="font-medium">Color:</span> {color}</p>
                  
                  {isDiscounted ? (
                    <div className="mt-2">
                      <p>
                        <span className="font-medium">Original Price:</span> 
                        <span className="line-through ml-1">${originalPrice.toFixed(2)}</span>
                      </p>
                      <p className="text-green-600 font-bold">
                        Discounted Price: ${discountedPrice.toFixed(2)}
                      </p>
                      <p className="text-sm text-red-500">
                        You save: ${discount.toFixed(2)} (20% off)
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2">
                      <span className="font-medium">Price:</span> ${price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Parent component that combines both
const MobileApp = () => {
  const [mobileList, setMobileList] = useState([]);

  const handleAddMobile = (newMobile) => {
    setMobileList([...mobileList, newMobile]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mobile Phone Discount Showcase</h1>
      <MobileInput onAddMobile={handleAddMobile} />
      <MobileDisplay mobiles={mobileList} />
    </div>
  );
};

export default MobileApp;