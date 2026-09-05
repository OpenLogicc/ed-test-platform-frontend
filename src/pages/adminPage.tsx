import React, { useState } from "react";
import { Navbar } from "../components/navbar/Navbar";
import { SideBarAdmin } from "../components/admin/sidebar-admin/SideBarAdmin";
import { AdminContent } from "../components/adminContent/AdminContent";

export const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <Navbar />
      <SideBarAdmin
        onLinkClick={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div
        className={`
                    mt-18 bg-slate-950 min-h-screen text-white
                    transition-all duration-300
                    ${isSidebarOpen ? "sm:ml-64" : "ml-0"}
                `}
      >
        {/* <SideBar /> */}
        <AdminContent section={activeSection} />
      </div>
    </div>
  );
};
