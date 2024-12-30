import React from 'react';
import Navbar from '../components/Navbar';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen pt-20 px-4 bg-gray-50">
        {/* Page Header */}
        <div className="text-[#4C7766] font-bold text-5xl text-center">
          Get in Touch with Us
        </div>

        {/* Contact Details */}
        <div className="flex flex-col justify-center items-center bg-[#4C7766] text-white bg-opacity-70 backdrop-blur-xl p-8 rounded-xl mt-10 shadow-lg w-full max-w-lg">
          <h2 className="font-bold text-2xl font-serif mb-6 text-center">
            We'd love to hear from you!
          </h2>
          <div className="flex flex-col gap-6">
            <p className="font-serif text-lg font-bold">
              <span className="text-xl">📧 Email: </span> sakthi@gmail.com
            </p>
            <p className="font-serif text-lg font-bold">
              <span className="text-xl">📞 Phone: </span> 123-456-7890
            </p>
            <p className="font-serif text-lg font-bold">
              <span className="text-xl">📍 Address: </span> Kongu Engineering College, Perundurai, Erode, Tamil Nadu
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
