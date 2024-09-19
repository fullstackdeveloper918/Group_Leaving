"use client"
import Link from "next/link";
import React, { useState } from "react";
import Images from "@/constants/images";
import Image from "next/image";
const screenSize = {
  mobileWidth: 767,
  
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="w-full">
        {/* Banner */}
        <div className="bg-blueBg text-center text-sm py-3 text-white">
          <span className="w-4/5 px-2">
            Our back-to-school sale is here! Save 15% on Coins for all your fall invitations with code BACKTOFALL. Ends 9/3. {' '}
            <a href="#" className="underline text-white">Shop Now</a>
          </span>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <Link href={`/`} className='no-underline w-3/12' >
            <div className="flex items-center  text-xl font-semibold">
              <span className="text-black">Group</span>
              <span className="text-blueText">leaving</span>
              <span className="text-black">cards</span>
            </div>
          </Link>


          <div className="flex items-center space-x-4  w-9/12 justify-end">
          {/* Search Bar */}
          <div className="relative hidden md:block w-1/3">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-2 border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
             <Image src={Images.Search} alt="search" width={20}
              height={20} />
            </span>
          </div>

          {/* Auth and Button */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-blackText hidden md:block text-blackText no-underline">Login</a>
            <button className=" text-white px-3 py-2 rounded-md bg-blueBg">
              Sign In
            </button>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600"
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
          </div>
        </div>

        {/* Navigation Links */}
        {/* <nav className={`md:flex md:justify-center md:space-x-6 text-sm text-gray-700 py-2 border-t absolute inset-x-0 top-16 md:static md:top-auto transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}> */}
        <nav className={`md:flex md:justify-center md:space-x-6 text-sm text-gray-700 py-2 border-t absolute inset-x-0 top-16 md:static md:top-auto transition-transform duration-300 `}>
          <a href="/card/farewell" className="block px-4 py-2 hover:text-orange-500 no-underline text-black">Farewell</a>
          <a href="/card/birthday" className="block px-4 py-2 hover:text-orange-500 no-underline text-black">Birthday Cards</a>
          <a href="/card/baby" className="block px-4 py-2 hover:text-orange-500 no-underline text-black">New Baby</a>
          <a href="/card/retirement" className="block px-4 py-2 hover:text-orange-500 no-underline text-black">Retirement</a>
          <a href="/card/sympathy" className="block px-4 py-2 hover:text-orange-500 no-underline text-black">Sympathy</a>
          <a href="/card/wedding" className="block px-4 py-2 hover:text-orange-500 no-underline text-black">Wedding</a>
          <a href="/card/welcome" className="block px-4 py-2 hover:text-orange-500 no-underline text-black">Welcome</a>
          <a href="/card/thank-you" className="block px-4 py-2 hover:text-orange-500 no-underline text-black">Thank You</a>
        </nav>
      </header>
    </>
  );
};

export default Navbar;