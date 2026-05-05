import React, { useState, useEffect } from "react";
import {
  Home,
  LayoutDashboard,
  FileText,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarOpen");
    if (saved !== null) setIsOpen(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const menu = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Candidate", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Analytics", icon: FileText, path: "/report" },
  ];

  const expanded = isOpen || isHovering;

  return (
    <div
      onMouseEnter={() => !isOpen && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`${
        expanded ? "w-64" : "w-20"
      } h-screen sticky top-0 bg-white border-r flex flex-col justify-between transition-all duration-300 shadow-sm`}
    >
      {/* 🔝 TOP */}
      <div className="p-4">
        
        {/* ✅ Modern Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-6 p-2 rounded-lg hover:bg-gray-100"
        >
          {expanded ? <PanelLeftClose /> : <PanelLeftOpen />}
        </button>

        {/* MENU */}
        <div className="space-y-2">
          {menu.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center ${
                    expanded ? "gap-3 px-4" : "justify-center"
                  } py-3 rounded-xl transition ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                {/* Active bar */}
                <span className="absolute left-0 top-0 h-full w-1 bg-indigo-600 rounded-r opacity-0 group-[.active]:opacity-100"></span>

                <Icon size={20} />

                {expanded && <span>{item.name}</span>}

                {/* Tooltip */}
                {!expanded && (
                  <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* 🔻 LOGOUT (FIXED BOTTOM ALWAYS) */}
      <div className="p-4">
        <button
          className={`group relative flex items-center ${
            expanded ? "gap-3 px-4" : "justify-center"
          } py-3 w-full text-gray-600 hover:bg-gray-100 rounded-xl`}
        >
          <LogOut size={20} />
          {expanded && <span>Logout</span>}

          {!expanded && (
            <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;