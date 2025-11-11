// components/Navbar.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X, ChevronDown, Home, BookOpen, Heart, UserCircle } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-orange-500 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              LibraryMS
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-white hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center ">
                <Home className="w-4 h-4 mr-1" />
                Home page
              </Link>
              <Link href="/user/books" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                Books
              </Link>
              <Link href="/borrowing" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                Borrowing Center
              </Link>
              <Link href="/favorites" className="text-white hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                Favorites
              </Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            {/* <button className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none">
              <Search className="h-5 w-5" />
            </button> */}

            {/* User Avatar */}
            <div className="relative">
              <Link href="/user/setting">
              <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {/* <Image
                  className="h-8 w-8 rounded-full"
                  src=""
                  alt="User Avatar"
                  width={32}
                  height={32}
                /> */}
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Home page
            </Link>
            <Link href="/books" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
              Books
            </Link>
            <Link href="/borrowing" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
              Borrowing Center
            </Link>
            {/* <Link href="/favorites" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
              Favorites
            </Link> */}
          </div>
        </div>
      )}
    </nav>
  );
}