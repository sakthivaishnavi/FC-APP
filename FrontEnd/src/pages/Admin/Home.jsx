import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

import Navbar from './AdminNav'; // Importing the Navbar

const AdminPage = () => {
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items
  const [biryani, setBiryani] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const specialItems = [
    { id: 1, name: 'Chicken Biryani', price: 100, type: 'Non-Veg', image: "https://www.watchwhatueat.com/wp-content/uploads/2021/05/Instant-Pot-Chicken-Biryani-9.jpg"},
    { id: 2, name: 'Mushroom Biryani', price: 80, type: 'Veg', image:  "https://th.bing.com/th/id/OIP.FeStwxVmI1jJvtF8_EG1igHaEK?w=317&h=180&c=7&r=0&o=5&pid=1.7" },
    { id: 3, name: 'Paneer Tikka', price: 150, type: 'Veg', image: 'https://static.fanpage.it/wp-content/uploads/sites/22/2021/08/paneer-tikka.jpg' },
    { id: 4, name: 'Chicken Roast', price: 220, type: 'Non-Veg', image: 'https://th.bing.com/th/id/OIP.sXUJcjfIJSEE-jD9S_1IMAHaHa?w=1600&h=1600&rs=1&pid=ImgDetMain' },
    { id: 5, name: 'Lamb Korma', price: 180, type: 'Non-Veg', image: 'https://www.simplyrecipes.com/thmb/euM5I0mKRrfVilO3ElJNt-I3EIs=/1600x1067/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2013__05__lamb-korma-horiz-a-1600-b08d7aa4f6df47f9bb0dbf40c206e0ad.jpg' },
    { id: 6, name: 'Veg Pulao', price: 100, type: 'Veg', image: 'https://i0.wp.com/vegecravings.com/wp-content/uploads/2016/07/veg-pulao-recipe-step-by-step-instructions.jpg?fit=3840%2C2992&quality=30&strip=all&ssl=1' },
    { id: 7, name: 'Butter Chicken', price: 170, type: 'Non-Veg', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/chicken-butter-masala-recipe.jpg' },
    { id: 8, name: 'Tandoori Chicken', price: 220, type: 'Non-Veg', image: 'https://th.bing.com/th/id/OIP.21xfGQ9jUczQhBfBTgASHwHaEJ?w=3960&h=2215&rs=1&pid=ImgDetMain' },
    { id: 9, name: 'Chole Bhature', price: 80, type: 'Veg', image: 'https://as2.ftcdn.net/v2/jpg/03/97/46/67/1000_F_397466703_AI9PwXQRVSiaPEuP7I9OtMVB5ZTLlJ8l.jpg' },
    { id: 10, name: 'Aloo Paratha', price: 70, type: 'Veg', image: 'https://th.bing.com/th/id/OIP.hyMskoW1VQY5gZVZC5u3QQHaEK?w=1600&h=900&rs=1&pid=ImgDetMain' },
  ];

  useEffect(() => {
    // Simulate a loading delay to fetch data (if any)
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleSave = () => {
    toast.loading('Saving...', { id: 'saveToast' }); // Show a loading toast

    axios
      .post('https://fc-app.onrender.com/admin/add', { items: selectedItems })
      .then((response) => {
        console.log(response);
        toast.success('Items saved successfully!', {
          id: 'saveToast', // Dismiss loading toast
          style: { background: 'white', color: '#4C7766' }, // Red "hot" style
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to save items!', {
          id: 'saveToast',
          style: { background: 'white', color: '#4C7766' },
        });
      });

    axios
      .put(
        'https://fc-app.onrender.com/protected/',
        { quantity: biryani },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F0F4F1]">
        <div className="text-2xl font-bold text-[#4C7766]">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster /> {/* Add Toaster for toast notifications */}
      <Navbar /> {/* Use the Navbar here */}
      <div className="w-full px-4 sm:px-8 py-10 bg-[#F0F4F1] pt-24">
        <div className="max-w-3xl mx-auto border-2 rounded-lg p-6 bg-white shadow-lg mt-20">
          <h1 className="text-2xl font-bold text-[#4C7766] mb-6">Manage Specials</h1>

          {/* Dropdown for selecting items */}
          <div className="mb-4">
            <label className="block text-[#4C7766] font-medium mb-2">Select an Item</label>
            <select
              onChange={(event) => {
                const selectedItem = specialItems.find((item) => item.name === event.target.value);
                if (selectedItem) {
                  setSelectedItems((prevItems) => [...prevItems, selectedItem]);
                }
              }}
              className="w-full p-2 border rounded-md text-[#4C7766] focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select an item</option>
              {specialItems.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Display selected items */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4 text-[#4C7766]">Selected Items</h2>
            {selectedItems.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg bg-[#F0F4F1]"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                    <div>
                      <h3 className="font-semibold text-[#4C7766]">{item.name}</h3>
                      <p className="text-sm text-[#4C7766]">Price: ${item.price.toFixed(2)}</p>
                      <p className="text-sm text-[#4C7766]">Type: {item.type}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#4C7766]">No items selected yet.</p>
            )}
          </div>

          {/* Set Biryani Quantity */}
          <div className="mt-6">
            <label className="block text-[#4C7766] font-medium mb-2">Set Biryani Quantity</label>
            <input
              type="number"
              name="Biryani"
              className="w-full p-2 border rounded-md text-[#4C7766] focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setBiryani(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button
            className="w-full mt-6 bg-[#4C7766] text-white py-2 rounded-md font-semibold hover:bg-[#4C7766] hover:bg-opacity-80 transition duration-300"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
