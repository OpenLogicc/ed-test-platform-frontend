import React from "react";
import { AdminHome } from "../admin/adminHome/AdminHome";
import CreatedTest from "../admin/createdTest/CreatedTest";
import Mentors from "../admin/mentors/Mentors";

interface AdminContentProps {
  section: string;
}

export const AdminContent: React.FC<AdminContentProps> = ({ section }) => {
  const renderContent = () => {
    switch (section) {
      case "adminHome":
        return <AdminHome />;
      case "createdTests":
        return (
          <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
           <CreatedTest />
          </div>
        );
      case "mentors":
        return <Mentors />;
      case "payments":
        return (
          <div className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-700">
            <h1 className="text-4xl font-bold mb-3">Payments 💳</h1>
            <p className="text-slate-400 text-lg">
              Manage your payments and billing information.
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
            <h1 className="text-4xl font-bold mb-3">Settings ⚙️</h1>
            <p className="text-slate-400 text-lg">
              Customize your preferences and account settings.
            </p>
          </div>
        );
      default:
        return <AdminHome />;
    }
  };

  return <div>{renderContent()}</div>;
};
