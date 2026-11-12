import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await fetch("http://localhost:8080/api/v1/auth/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error("Logout request failed:", error);
        }
      }

      // Clear token and redirect to /login regardless of network outcome
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
      <p className="text-sm animate-pulse">Logging out...</p>
    </div>
  );
};