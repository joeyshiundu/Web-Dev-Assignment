import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-10 relative rounded-t-3xl ">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition-transform transform hover:scale-110">
                <FaFacebook size={28} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-transform transform hover:scale-110">
                <FaTwitter size={28} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-transform transform hover:scale-110">
                <FaInstagram size={28} />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact Us</h3>
            <p className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 hover:text-blue-300 transition">
              <FaEnvelope size={18} />
              <a href="mailto:info@yourcompany.com">info@jobboard.com</a>
            </p>
            <p className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 hover:text-green-400 transition mt-2">
              <FaPhone size={18} />
              <a href="tel:+123456789">+254 735033337</a>
            </p>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Stay Updated</h3>
            <form className="flex items-center justify-center md:justify-start bg-gray-800 rounded-lg overflow-hidden">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 bg-transparent text-white outline-none placeholder-gray-400"
              />
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white font-semibold">
                Subscribe
              </button>
            </form>
          </div>
          
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright Section */}
        <div className="text-center text-gray-400 text-sm">
          <p>© {year} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
