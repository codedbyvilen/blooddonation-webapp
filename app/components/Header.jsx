import Image from 'next/image';
import React from 'react';
import uk from '../../public/uk.png';
import admin from '../../public/admin.jpg';
import { Bell } from 'lucide-react';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-xl">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Left - Page Title */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>

        {/* Right - Icons & Profile */}
        <div className="flex items-center space-x-3 sm:space-x-6">

          {/* Language/Flag */}
          <Image
            src={uk}
            alt="Language"
            width={24}
            height={16}
            className="rounded shadow cursor-pointer hover:scale-105 transition-transform"
          />

          {/* Notification Bell */}
          <div className="relative">
            <Bell className="w-5 sm:w-6 h-5 text-gray-500 hover:text-primary cursor-pointer transition-colors" />
            {/* Optional: Notification Dot */}
            {/* <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span> */}
          </div>

          {/* Profile */}
          <div className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
