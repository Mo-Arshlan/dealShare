import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const AdminLayout = ({ children }) => {
  // const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickAway = () => {
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="relative flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {isOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div
            className={`fixed md:hidden ease-in-out transition-all duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}
    `}
          >
            <Sidebar />
          </div>
        </ClickAwayListener>
      )}
      <section className="flex-1 flex flex-col min-h-screen">
        <Toaster
          toastOptions={{
            // Default options for all toasts
            duration: 3000, // Auto-close after 3 seconds
            style: {
              // fontSize: '1.6rem',
            },
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
            },
          }}
        />
        <Header toggleSidebar={toggleSidebar} />
        <section className="flex-1 bg-[#eff3f4]">{children}</section>
      </section>
    </main>
  );
};

export default AdminLayout;
