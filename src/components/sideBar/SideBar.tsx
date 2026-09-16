import React, { useState } from "react";

interface SideBarProps {
  onLinkClick?: (section: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBar: React.FC<SideBarProps> = ({
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
            {/* Dashboard */}
            <li>
              <button
                onClick={() => handleClick("dashboard")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">Dashboard</span>
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

            {/* Mentorship */}
            <li>
              <button
                onClick={() => handleClick("mentorship")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">1-to-1 Mentorship</span>
              </button>
            </li>

            {/* Test Series */}
            <li>
              <button
                onClick={() => handleClick("tests")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">Test Series</span>
              </button>
            </li>

            {/* My Test */}
            <li>
              <button
                onClick={() => handleClick("my-tests")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">My Tests</span>
              </button>
            </li>

            {/* Chapter Tests */}
            <li>
              <button
                onClick={() => handleClick("chapter-tests")}
                className="w-full text-left flex items-center p-3 text-slate-300 rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <span className="ml-3">Chapter Tests</span>
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
