import React from "react";
import { Bell, Sun } from "lucide-react";

function Header() {
  return (
    <div className="w-full flex justify-between items-center px-6 h-16">
      
      {/* ✅ LEFT: LOGO */}
      <div className="flex items-center gap-2">
        <img
          src="/logo.png"   // 👉 put your logo in public folder
          alt="logo"
          className="w-8 h-8"
        />
        {/* <h1 className="text-lg font-semibold">MyApp</h1> */}
      </div>

      {/* ✅ RIGHT */}
      <div className="flex items-center gap-4">
        
        {/* Theme */}
        <button className="p-2 rounded-full border hover:bg-gray-100">
          <Sun size={18} />
        </button>

        {/* Notification */}
        <button className="p-2 rounded-full border relative hover:bg-gray-100">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* ✅ Profile */}
        <div className="flex items-center gap-2 border px-3 py-1 rounded-full">
          
          {/* Girl Image */}
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />

          <div className="leading-tight">
            <p className="text-sm font-medium">Puja Gupta</p>
            <p className="text-xs text-gray-500">
              pujagupta43@gmail.com
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Header;