import React from "react";
import { SideBar } from "../sideBar/SideBar";
import { Notifications } from "../notifications/Notifications";

export const Navbar = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-slate-950 border-b border-slate-800 shadow-lg">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="sm:hidden text-white hover:bg-slate-800 rounded-lg p-2"
              >
                <span className="sr-only">Open sidebar</span>

                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M5 7h14M5 12h14M5 17h10"
                  />
                </svg>
              </button>

              <a href="/" className="flex items-center ms-2 md:me-24">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  E
                </div>

                <span className="ml-3 text-2xl font-bold text-white">
                  EdTech
                </span>
              </a>
            </div>

            {/* Right Side */}
            <div className="flex items-center">
              <div className="flex items-center gap-4">
                <Notifications />
                <button className="flex text-sm mr-6 rounded-full focus:ring-4 focus:ring-purple-400">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-purple-500"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
