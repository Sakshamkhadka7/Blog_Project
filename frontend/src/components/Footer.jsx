import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">Connect With Us</h1>

          <div className="flex gap-5 text-xl">
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            <FaSquareInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
            <FaTiktok className="hover:text-gray-400 cursor-pointer" />
          </div>

          <p className="text-sm text-gray-400">
            Follow us on social media for updates and new blogs.
          </p>
        </div>

        <div className="space-y-3">
          <h1 className="text-lg font-semibold">The Project</h1>

          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Learn</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h1 className="text-lg font-semibold">Learn More</h1>

          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">Teams</li>
            <li className="hover:text-white cursor-pointer">Creators</li>
            <li className="hover:text-white cursor-pointer">API</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h1 className="text-lg font-semibold">Contact</h1>

          <p className="text-sm text-gray-300">
            <span className="font-bold">Phone:</span> 9807123818
          </p>

          <p className="text-sm text-gray-300">
            <span className="font-bold">Email:</span> sakshamcode12@gmail.com
          </p>

          <div className="flex items-center gap-3">
            <FaWhatsapp className="text-green-500 text-xl" />
            <span className="text-sm">9807123818</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
        © 2026 Saksham Khadka. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
