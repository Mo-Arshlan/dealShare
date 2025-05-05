import React, { useState } from "react";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";

const CategoryForm = ({ value, setValue, onCategoryCreated}) => {
  
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  //* category's id to be edited
  const { id } = useParams();

  //* handle Create form
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/category/create-category`,
        { name: value }
      );
      if (data.success) {
        toast.success(`Category "${value}" created successfully`);
        setValue("");
        if (onCategoryCreated) onCategoryCreated(); // 👈 Trigger re-fetch
        navigate('/dashboard/admin/categories')
        setCreating(false);
      } else {
        setCreating(false);
        toast.error(data.message);
    }
} catch (error) {
  setCreating(false);
    if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong in category form");
      }
    }
  };

  //* update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/category/update-category/${
          id
        }`,
        { name: value }
      );
      if (data?.success) {
        toast.success(data.message);
        setValue("");
        if (onCategoryCreated) onCategoryCreated(); // 👈 Trigger re-fetch
        navigate('/dashboard/admin/categories');
        setUpdating(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setUpdating(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white px-5 py-3 md:w-[400px]">
      <div className="flex justify-between items-center h-8">
      <h1 className="font-semibold block">{ !id ? "Create" : "Update"} Category</h1>
      
        <Link className={`text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-full p-1 shadow-sm transition duration-200 ease-in-out ${!id ? "hidden" : "block" }`} to={'/dashboard/admin/categories'}><Plus size={17} /></Link>
      
      </div>
      <form className="flex flex-col gap-3" onSubmit={!id ? handleCreate : handleUpdate}>
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-sm text-gray-500">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="category-name"
            id="category-name"
            placeholder="Enter Name"
            required
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)} // ✅ Updates state
          />
        </div>

        <Button type="submit"
        disabled={creating || updating}>
          { !id ? "Create" : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
