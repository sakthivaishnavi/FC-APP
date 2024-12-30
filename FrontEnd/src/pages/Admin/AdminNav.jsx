import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id="navbar" className="flex items-center justify-between bg-[#4C7766] bg-opacity-70 font-sans font-semibold px-8 pt-2 fixed w-full h-16 shadow-lg z-50">
            {/* Logo Section */}
            <div className="flex justify-between items-center">
                <div className="flex flex-shrink-0 items-center text-5xl font-bold cursor-pointer mt-1">
                    <h2 className="text-4xl font-bold font-serif px-10 text-white">
                        E-Food Court
                    </h2>
                </div>

                {/* Mobile Burger Icon */}
                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMenu}>
                        {isOpen ? (
                            <HiX className="text-3xl text-white" />
                        ) : (
                            <HiMenu className="text-3xl text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-16 right-0 shadow-lg rounded-2xl py-4 px-7 bg-[#4C7766] bg-opacity-90 text-white backdrop-blur-md flex flex-col gap-4 w-full z-10">
                    <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="text-lg hover:text-gray-200"
                    >
                        Home
                    </Link>
                    <Link
                        to="/orderList"
                        onClick={() => setIsOpen(false)}
                        className="text-lg hover:text-gray-200"
                    >
                        Order List
                    </Link>
                    
                    <Link
                        to="/adminLogin"
                        onClick={() => {
                            setIsOpen(false);
                            localStorage.removeItem('admin_token');
                        }}
                        className="text-lg hover:text-gray-200 bg-red-400 hover:bg-red-500 rounded-full p-2"
                    >
                        Logout
                    </Link>
                </div>
            )}

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-center gap-9 text-xl cursor-pointer">
                <div>
                    <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:border-b-4 hover:scale-y-105 hover:border-black hover:text-black p-2"
                        >
                        Home
                    </Link>
                </div>
                <div>
                    <Link
                        to="/orderList"
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:border-b-4 hover:scale-y-105 hover:border-black hover:text-black p-2"
                        >
                        Order List
                    </Link>
                </div>
                
                <div>
                    <Link
                        to="/adminLogin"
                        onClick={() => {
                            setIsOpen(false);
                            localStorage.removeItem('admin_token');
                        }}
                        className="text-white hover:border-b-4 hover:scale-y-105 hover:border-black hover:text-black p-2"
                        >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
