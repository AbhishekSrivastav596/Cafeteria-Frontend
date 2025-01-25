import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">
            Twitter Feed
          </h3>
          <p className="text-sm mb-2">
            For all the latest news and updates, follow us on Twitter:
          </p>
          <p className="text-sm font-semibold">@CafeteriaHandle</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-3xl font-signature">S</span>
            </div>
          </div>
          <p className="text-sm">
            Welcome, To the Cafeteria
          </p>
          <p className="mt-2 text-sm font-semibold">+1-800-123-4567</p>
          <p className="text-sm font-semibold">support@cafeteria.com</p>
          <p className="text-sm">123 Cafeteria Street, New Delhi</p>
        </div>
        <div className="text-center md:text-right">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">
            Follow Me
          </h3>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Cafeteria. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
