'use client';

import { Menu, LayoutDashboard, Users, Droplet, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ICONS = {
  LayoutDashboard,
  Users,
  Droplet,
  FileText,
  Settings,
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarItems, setSidebarItems] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setSidebarItems(data.sidebarItems));
  }, []);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="h-full bg-white border-r border-[#E0E0E0] shadow-md flex flex-col p-4">

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-[#FFEAEA] transition-colors max-w-fit cursor-pointer"
        >
          <Menu size={24} className="text-[#D32F2F]" />
        </button>

        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center p-3 text-sm font-medium rounded-lg group transition-colors mb-2 ${
                    isActive
                      ? 'bg-[#D32F2F] text-white shadow'
                      : 'hover:bg-[#FFEAEA] text-[#333333]'
                  }`}
                >
                  <IconComponent
                    className={`${
                      isActive
                        ? 'text-white'
                        : 'text-[#757575] group-hover:text-[#D32F2F]'
                    }`}
                    size={20}
                    style={{ minWidth: '20px' }}
                  />

                  {isSidebarOpen && (
                    <span
                      className={`ml-4 ${
                        isActive ? 'text-white' : 'group-hover:text-[#D32F2F]'
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
