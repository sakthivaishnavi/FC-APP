import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Token from "./Token";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [viewToken,setViewToken]=useState(false);

  if (token == null) {
    navigate("/login");
  }

  useEffect(() => {
    if (username) {
      axios
        .get(`https://fc-app.onrender.com/protected/cart/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCartItems(response.data[0]?.items || []);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.warn("Username is missing or undefined.");
    }
  }, [username]);

  const handlePayment = async () => {
    try {
      console.log(token);
      const response = await axios.post(
        "https://fc-app.onrender.com/protected/create-order",
        { amount: totalPrice*100 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { id: order_id, amount, currency } = response.data;
      console.log(response.data);
      const options = {
        key: "rzp_test_KjWqiF0J29xI5A",
        amount: amount,
        currency: currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order_id,
        handler: async (response) => {
          const verifyResponse = await axios.post(
            "http://127.0.0.1:5000/protected/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(verifyResponse.data);

          if (verifyResponse.data.status === "success") {
            alert("Payment successful!");
            navigate("/token");
            const order = await axios.post(
              "https://fc-app.onrender.com/protected/orderlist",
              {
                orders: cartItems,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(order);
            if (order.data.success) {
              console.log("Order placed successfully");
              await axios.delete(
                `https://fc-app.onrender.com/protected/cart-remove/${username}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              
              setCartItems([]);
            }
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "Test User",
          email: "testuser@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error in payment process:", error);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((item, itemIndex) => itemIndex !== index);
    axios
      .post(
        "https://fc-app.onrender.com/protected/cart/remove",
        {
          user: username,
          item: updatedCart,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        ).catch((err)=>{
            console.log(err);
        }
        )
        if(name=="Chicken Biryani"){
            axios.get('https://fc-app.onrender.com/protected/',{
                "headers": {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response)=>{
                console.log(response.data[5])
                axios.put('https://fc-app.onrender.com/protected/',{
                    'quantity':response.data[5].quantity+quantity
                },{
                    "headers": {
                            'Authorization': `Bearer ${token}`
                    }}).then((response)=>{
                        console.log(response)
                    }
                ).catch((err)=>{
                    console.log(err)
                }
                )

        }).catch((err)=>{
            console.log(err)
        })
        }


    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Navbar with burger menu */}
      <Navbar />

      {/* Cart Section */}
      <div className="max-w-screen-lg mx-auto px-4 sm:px-8 pt-20">
        <h1 className="text-3xl sm:text-4xl text-center mt-5 font-bold mb-6 text-black">
          Your Cart
        </h1>

        {cartItems.length > 0 ? (
          <div className="bg-[#4C7766] bg-opacity-70 backdrop-blur-xl shadow-md rounded-xl p-6 sm:p-8">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between border-b py-4 items-center sm:items-start"
              >
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-black font-semibold">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                  <p className="text-xl font-bold">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-white text-[#4C7766] font-bold py-1 px-3 rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <h2 className="text-xl sm:text-2xl font-bold">Total:</h2>
              <p className="text-xl sm:text-2xl font-bold">₹{totalPrice}</p>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-white text-[#4C7766] font-bold py-2 px-6 rounded-xl w-full sm:w-auto"
                onClick={handlePayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xl sm:text-2xl text-black text-center mt-6">
            Your cart is empty.
          </p>
        )}
      </div>
      

    </>
  );
};

export default Cart;
/* if (captureRef.current) {
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
*/