import React from "react";
import {
  House,
  Layers2,
  LayoutDashboard,
  LogOut,
  PackageOpen,
  ShieldCheck,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Home",
      link: "/",
      icon: <House className="h-5 w-5" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      link: "/dashboard/admin/products",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      name: "Categories",
      link: "/dashboard/admin/categories",
      icon: <Layers2 className="h-5 w-5" />,
    },
    {
      name: "Users",
      link: "/dashboard/admin/users",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Admins",
      link: "/dashboard/admin/admins",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <section className="flex flex-col bg-white gap-3 border-r border-gray-300 h-screen overflow-hidden w-[260px] px-5 py-3">
      <div className="flex justify-center py-4">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>
      <ul className="flex-1 flex flex-col gap-4 h-full overflow-y-auto">
        {menuItems?.map((item, key) => (
          <NavLink
            to={item.link}
            end
            key={key}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 gap-3 font-semibold rounded transition-all duration-300 ease-in-out
         ${
           isActive
             ? "bg-blue-600 text-white"
             : "hover:bg-blue-500 hover:text-white"
         }`
            }
          >
            <li className="flex items-center gap-3">
              {item?.icon} {item?.name}
            </li>
          </NavLink>
        ))}
      </ul>
      <div className="flex justify-center hover:bg-blue-600 hover:text-white rounded ease-in-out transition-all duration-300">
        <button
          className="flex items-center justify-center gap-2 px-4 py-2"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
