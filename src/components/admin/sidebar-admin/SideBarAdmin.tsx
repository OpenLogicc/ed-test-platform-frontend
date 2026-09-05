import React, { useState } from "react";
import Mentors from "../mentors/Mentors";

interface SideBarProps {
  onLinkClick?: (section: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBarAdmin: React.FC<SideBarProps> = ({
  onLinkClick,
  isOpen,
  setIsOpen,
}) => {
  const handleClick = (section: string) => {
    if (onLinkClick) {
      onLinkClick(section);
    }
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        className={`
                    fixed top-17 z-50
                    w-10 h-10 rounded-full
                    bg-purple-500 text-white
                    flex items-center justify-center
                    shadow-md transition-transform duration-300
                    ${isOpen ? "translate-x-56" : "translate-x-0"}
                `}
      >
        <span className="text-lg font-semibold">{isOpen ? "←" : "→"}</span>
      </button>

      {/* Sidebar */}
      <aside
        className={`
                    fixed top-0 left-0 z-40
                    w-64 h-screen pt-20
                    bg-slate-950 border-r border-slate-800
                    transition-all duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          {/* Menu */}
          <ul className="space-y-3 font-medium">
            {/* Admin Page */}
            <li>
              <button
                onClick={() => handleClick("AdminHome")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">Admin Page</span>
              </button>
            </li>

            {/* Students */}
            <li>
              <button
                onClick={() => handleClick("students")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">Students</span>
              </button>
            </li>
            {/* Mentors */}
            <li>
              <button
                onClick={() => handleClick("mentors")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
              <span className="ml-3">Mentors</span>
              </button>
            </li>
            {/* Created Test */}
            <li>
              <button
                onClick={() => handleClick("createdTests")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">Created Test</span>
              </button>
            </li>
            {/* Inbox */}
            <li>
              <button
                onClick={() => handleClick("inbox")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">Inbox</span>
                <span className="ml-auto text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                  5
                </span>
              </button>
            </li>

            {/* Analytics */}
            <li>
              <button
                onClick={() => handleClick("analytics")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">Analytics</span>
              </button>
            </li>

            {/* Payments */}
            <li>
              <button
                onClick={() => handleClick("payments")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">Payments</span>
              </button>
            </li>

            {/* Settings */}
            <li>
              <button
                onClick={() => handleClick("settings")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
