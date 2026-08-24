import React, { useState } from "react";
import { Navbar } from "../components/navbar/Navbar";
import { SideBar } from "../components/sideBar/SideBar";
import { MainContent } from "../components/mainContent/MainContent";

export const Home = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <Navbar />

      <SideBar
        onLinkClick={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div
        className={`
                    p-2 mt-20 bg-slate-900 min-h-screen text-white
                    transition-all duration-300
                    ${isSidebarOpen ? "sm:ml-64" : "ml-0"}
                `}
      >
        <MainContent section={activeSection} />
      </div>
    </div>
  );
};
