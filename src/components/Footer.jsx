import React from "react";

function Footer() {
  return (
    <>
        <div className="bg-[#faf0e6] text-black py-6">
          <p className="text-xl italic text-center mb-4">"The best part of your day? Probably dining with us!"</p>
          <div className="container mx-auto max-w-4xl flex justify-between items-center px-4">
            <div className="w-full md:w-1/2 pr-4">
              <h4 className="font-bold text-lg">Address</h4>
              <p className="text-sm">123 Cafeteria Street, New Delhi</p>
              <p className="text-sm">+1-800-123-4567</p>
            </div>
            <div className="border-l-1 border-gray-400 h-16 mx-4"></div>
            <div className="w-full md:w-1/2 pl-4 text-right">
              <h4 className="font-bold text-lg">Opening Hours</h4>
              <p className="text-sm">Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p className="text-sm">Sat - Sun: 10:00 AM - 11:30 PM</p>
            </div>
          </div>
        </div>

      <footer className="bg-[#404D3C] text-white py-10">
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
            <p className="text-sm">Welcome, To the Cafeteria</p>
            <p className="mt-2 text-sm font-semibold">+1-800-123-4567</p>
            <p className="text-sm font-semibold">support@cafeteria.com</p>
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
    </>
  );
}

export default Footer;
