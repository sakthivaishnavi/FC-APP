import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Token = () => {
  const [items, setItems] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/userLogin');
      return;
    }

    axios
      .get('https://fc-app.onrender.com/protected/token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setItems(response.data.orders[0]);
        setTimeout(async() => {
          if (captureRef.current) {
      try {
        const canvas = await html2canvas(captureRef.current);
        const imgData = canvas.toDataURL('image/png'); // Converts canvas to a base64 image
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'screenshot.png';
        link.click();
      } catch (error) {
        console.error('Error taking screenshot:', error);
      }
    }
       }, 5000);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [navigate]);

  if (!items) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const totalPrice = items.order.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6 mt-20">
          <h1 className="text-3xl font-bold text-gray-800">Token</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Token ID: {items.id}
          </p>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">S.No</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Quantity</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.order.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-200 px-4 py-2">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-lg font-bold text-gray-900">
            Total Price: ₹{totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Token;
