import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for navigation
import toast, { Toaster } from "react-hot-toast"; // Import for toaster notifications
import "../App.css";
import Navbar from "../components/Navbar";


const Hero = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [special, setSpecial] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("cart"); // 'cart' or 'buy'
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [biryani, setBiryani] = useState(0);

  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    axios
      .get("https://fc-app.onrender.com/protected/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const updatedMenuItems = response.data.map((item) => ({
          ...item
        }));
        setMenuItems(updatedMenuItems);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });

    axios
      .get("https://fc-app.onrender.com/protected/special", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setSpecial(response.data[0].items);
      })
      .catch((error) => {
        console.error("Error fetching specials:", error);
      });
  }, []);

  const openDialog = (item, mode) => {
    setSelectedItem(item);
    setQuantity(1);
    setDialogMode(mode);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedItem(null);
  };

  const handleAddToCart = () => {
    const updatedItem = { ...selectedItem, quantity };
    axios
      .post(
        "https://fc-app.onrender.com/protected/cart",
        {
          user: localStorage.getItem("username"),
          item: [
            {
              id: updatedItem.id,
              name: updatedItem.name,
              price: updatedItem.price,
              quantity: updatedItem.quantity,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Item added to cart:", response.data);
        axios
      .put(
        'https://fc-app.onrender.com/protected/',
        { quantity: (biryani - quantity) },
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
        toast.success(`${updatedItem.name} added to cart!`); // Show success toaster
        closeDialog();
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart."); // Show error toaster
      });
  };

  

  return (
    <>
      <Navbar />
      {/* Add Toaster Component */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-[#EBE6E0]">
  <div>
    <h1 className="text-2xl sm:text-3xl md:text-4xl text-black font-bold font-revellia px-4 sm:px-8 md:px-10 pt-16 sm:pt-24">
      Today's Specials
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-8 md:px-10 py-8 mt-4">
      {special.map((item) => (
        <div
          key={item.id}
          className="border p-4 text-white bg-[#4C7766] rounded-lg hover:border-[#4C7766] shadow-lg hover:shadow-2xl hover:scale-105 duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full rounded-lg h-48"
          />
          <h3 className="text-lg sm:text-xl font-bold mt-4">{item.name}</h3>
          <div className="flex justify-between mt-3">
            <p className="text-md sm:text-lg">{item.type}</p>
            <p className="text-md sm:text-lg font-bold">Price: ₹{item.price}</p>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => openDialog(item, "cart")}
              className="bg-white text-[#4C7766] border-2 hover:border-gray-400 font-bold py-2 px-4 rounded-2xl mt-4 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div>
    <h2 className="text-2xl sm:text-3xl md:text-4xl text-black font-bold px-4 sm:px-8 md:px-10 pt-12">
      Check out our Menu
    </h2>
    <div className="grid grid-cols-1 mx-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-8 md:px-10 py-6">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="border p-4 text-white bg-[#4C7766] rounded-lg hover:border-[#4C7766] shadow-lg hover:shadow-2xl hover:scale-105 duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full rounded-lg h-48"
          />
          <h3 className="text-lg sm:text-xl font-bold mt-4">{item.name}</h3>
          {item.quantity && <p>{item.quantity}</p>}
          <div className="flex mt-2 justify-between">
            <p className="text-sm sm:text-lg">{item.type}</p>
            <p className="text-sm sm:text-lg font-bold">Price: ₹{item.price}</p>
          </div>
          <div className="flex justify-center ">
            <button
              onClick={() => openDialog(item, "cart")}
              className="bg-white text-[#4C7766] border-2 hover:border-gray-400 font-bold py-2 px-4 rounded-2xl mt-4 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {dialogVisible && selectedItem && (
    <div className="fixed inset-0 bg-[#9DBBAE] bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-gray-200 text-[#4C7766] font-bold p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          {dialogMode === "cart" ? "Add to Cart" : "Buy Now"}
        </h2>
        <p className="mb-2">Item: {selectedItem.name}</p>
        <p className="mb-2">Price: ₹{selectedItem.price}</p>
        <div className="flex items-center gap-4">
          <label htmlFor="quantity" className="font-semibold">
            Quantity:
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="text-[#4C7766] border-2 border-[#4C7766] rounded px-2 py-1 w-16"
          />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={closeDialog}
            className="px-4 py-2 bg-white text-[#4C7766] border-[#4C7766] hover:bg-[#4C7766] hover:text-white border-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-white text-[#4C7766] border-[#4C7766] hover:bg-[#4C7766] hover:text-white border-2 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )}
</div>

      {dialogVisible && selectedItem && (
        <div className="fixed inset-0 bg-[#9DBBAE] bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-200 text-[#4C7766] font-bold p-8 rounded-lg shadow-2xl w-96">
            <h2 className="text-xl font-bold mb-4">
              {dialogMode === "cart" ? "Add to Cart" : "Buy Now"}
            </h2>
            <p className="mb-2">Item: {selectedItem.name}</p>
            <p className="mb-2">Price: ₹{selectedItem.price}</p>
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-semibold">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                className=" text-[#4C7766] border-2 border-[#4C7766] rounded px-2 py-1 w-16"
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeDialog}
                className="px-4 py-2 bg-white text-[#4C7766] border-[#4C7766] hover:bg-[#4C7766] hover:text-white border-2 rounded-lg"
              >
                Cancel
              </button>
             
                <button
                  onClick={()=>{
                    handleAddToCart();
                    }}
                  className="px-4 py-2 bg-white text-[#4C7766] border-[#4C7766] hover:bg-[#4C7766] hover:text-white border-2 rounded-lg"
                >
                  Add to Cart
                </button>
             
               
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
