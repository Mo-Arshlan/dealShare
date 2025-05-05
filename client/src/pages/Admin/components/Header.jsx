import { Menu } from "lucide-react";
import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <section className="flex items-center gap-3 bg-white px-4 py-4 border-b border-gray-300 h-16">
      <div className="flex justify-center items-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>
      <div className="font-semibold text-xl">Dashboard</div>
    </section>
  );
};

export default Header;
