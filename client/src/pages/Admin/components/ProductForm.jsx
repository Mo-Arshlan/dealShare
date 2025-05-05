import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = ({ onClose, product, setProduct, onProductCreated }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [categories, setCategories] = useState([]);
  //* get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/category/get-category`
      );
      setCategories(data?.categories);
    } catch (error) {
      console.log("Error while getting categories", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //* handle Create Product form
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/product/create-product`,
        {
          name: product.name,
          description: product.description,
          category: product.category,
          oPrice: product.oPrice,
          dPrice: product.dPrice,
          imageUrl: product.imageUrl,
          dealUrl: product.dealUrl,
          dealEndTime: product.dealEndTime,
        }
      );
      if (data.success) {
        toast.success(`Product "${product.name}" created successfully`);
        setProduct({
          name: "",
          category: "",
          description: "",
          oPrice: "",
          dPrice: "",
          imageUrl: "",
          dealUrl: "",
        });
        onClose();
        if (onProductCreated) onProductCreated(); // 👈 Trigger re-fetch
        navigate("/dashboard/admin/products");
        setCreating(false);
      } else {
        setCreating(false);
        toast.error(data.message);
      }
    } catch (error) {
      setCreating(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong in product form");
      }
    }
  };

  //* update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/product/update-product/${id}`,
        {
          name: product.name,
          description: product.description,
          category: product.category,
          oPrice: product.oPrice,
          dPrice: product.dPrice,
          imageUrl: product.imageUrl,
          dealUrl: product.dealUrl,
          dealEndTime: product.dealEndTime,
        }
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        onClose();
        if (onProductCreated) onProductCreated(); // 👈 Trigger re-fetch
        navigate("/dashboard/admin/products");
        setUpdating(false);
      } else {
        setUpdating(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setUpdating(false);
      // Extracting error message from the backend response
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong while updating product.");
      }
    }
  };

  const handleInput = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="bg-white px-6 py-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">
              {!id ? "Add New Deal" : "Update Deal"}
            </h2>
          </div>
          <button
            onClick={() => {
              onClose();
              navigate("/dashboard/admin/products");
            }}
            className="hover:bg-gray-200 rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Title
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleInput}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={product.category._id}
                onChange={handleInput}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a Category</option>
                {categories?.map((c) => {
                  return (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price
              </label>
              <input
                type="text"
                name="oPrice"
                value={product.oPrice}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleInput}
              />
            </div>

            {/* Discounted Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discounted Price
              </label>
              <input
                type="text"
                name="dPrice"
                value={product.dPrice}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleInput}
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={product.imageUrl}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleInput}
              />
            </div>

            {/* Product URL */}
            {/* <div className="md:col-span-2"> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product URL
              </label>
              <input
                type="text"
                name="dealUrl"
                value={product.dealUrl}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleInput}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                required
                value={product.description}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                onChange={handleInput}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={!id ? handleCreate : handleUpdate}
              type="submit"
              disabled={creating || updating}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition duration-150"
            >
              {!id ? "Create Deal" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
