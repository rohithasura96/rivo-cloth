"use client";

import React, { useState, useEffect } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest("nav") && !event.target.closest("button")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/features", label: "Features" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-lg" : "bg-[#C2EFD4]"
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <a 
          href="/" 
          className="text-2xl font-bold text-[#267144] z-50"
          onClick={() => setMenuOpen(false)}
        >
          Rivo
        </a>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-[#267144] focus:outline-none z-50 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Backdrop Overlay */}
        {menuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Navigation Links */}
        <nav
          className={`${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative top-0 left-0 h-full w-4/5 md:w-auto 
          bg-white md:bg-transparent transform transition-transform duration-300 ease-in-out
          md:flex md:items-center md:space-x-8 z-40 
          p-6 md:p-0 pt-20 md:pt-0`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#267144] hover:text-[#224F34] transition-colors duration-200 
                          font-medium text-lg md:text-base"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-6 mt-8 md:mt-0 lg:ml-8">
            <a 
              href="/cart" 
              className="text-[#267144] hover:text-[#224F34] transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingBag size={24} />
            </a>
            <a
              href="/login"
              className="border-[#267144] border text-[#267144] hover:text-[#fafbfa] px-6 py-1 rounded-md hover:bg-[#224F34] 
                        transition-colors duration-200 text-[16px] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;