import { useState } from "react";
import { Link } from "react-router-dom";
// import kec from "../assets/kec.jpeg";
// import { HiOutlineSearch } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for burger menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="navbar"
      className="flex items-center justify-between bg-[#4C7766] bg-opacity-70 font-sans font-semibold px-8 pt-2 fixed w-full h-16 shadow-xl z-50"
    >
      {/* Logo Section */}
      <div className="flex items-center">
        {/* <Link to="/home" className="flex items-center">
          <img src={kec} width={40} height={40} alt="Logo" />
        </Link> */}
        <h2 className="text-2xl sm:text-4xl font-bold font-serif px-4 text-white">
          E-Food Court
        </h2>
      </div>

      {/* Burger Icon for Small Screens */}
      <div
        className="lg:hidden text-white text-3xl cursor-pointer"
        onClick={toggleMenu}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white bg-opacity-90 text-[#4C7766] flex flex-col items-center py-6 gap-6 lg:hidden shadow-lg">
          <Link
            to="/home"
            onClick={() => setIsOpen(false)}
            className="text-lg hover:text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="text-lg hover:text-gray-200"
          >
            Cart
          </Link>
          <Link
            to="/contactUs"
            onClick={() => setIsOpen(false)}
            className="text-lg hover:text-gray-200"
          >
            Contact Us
          </Link>
          <Link
            to="/"
            onClick={() => {
              setIsOpen(false);
              localStorage.removeItem("token");
              localStorage.removeItem("username");
            }}
            className="text-lg hover:text-gray-200"
          >
            Logout
          </Link>
        </div>
      )}

      {/* Full Menu for Large Screens */}
      <div className="hidden lg:flex items-center justify-center gap-9 text-xl cursor-pointer">
        <Link
          to="/home"
          className="text-white hover:border-b-4 hover:scale-y-105 hover:border-black hover:text-black p-2"
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="text-white hover:border-b-4 hover:scale-y-105 hover:border-black hover:text-black p-2"
        >
          Cart
        </Link>
        <Link
          to="/contactUs"
          className="text-white hover:border-b-4 hover:scale-y-105 hover:border-black hover:text-black p-2"
        >
          Contact Us
        </Link>
        <Link
          to="/"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
          }}
          className="text-white hover:border-b-4 hover:scale-y-105 hover:border-black hover:text-black p-2"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
