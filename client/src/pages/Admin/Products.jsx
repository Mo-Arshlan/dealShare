import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Edit2, Trash2, X } from "lucide-react";
import ProductForm from "./components/ProductForm";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    oPrice: "",
    dPrice: "",
    imageUrl: "",
    dealUrl: "",
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [products, setProducts] = useState([]);

  //* get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/product/get-product`
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong in getting products.");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //* delete product
  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        await getAllProducts(); // ✅ Wait for new list to load
        setOpenDelMod(false); // ✅ Close modal
        // Delay clearing selectedProduct until after modal is hidden
        setTimeout(() => setSelectedProduct(null), 100); // ✅ Clear selected state
        // setSelected(null); // ✅ Clear selected state
      } else {
        toast.error("Failed to delete product.");
      }
      setDeleting(false);
    } catch (error) {
      console.log(error);
      setDeleting(false);
      toast.error("Something went wrong while deleting product.");
    } finally {
      setDeleting(false); // ✅ Reset in finally to guarantee execution
    }
  };

  //** */ modal
  const [openDelMod, setOpenDelMod] = useState(false);

  return (
    <AdminLayout>
      <section className="p-5 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="block font-semibold text-lg">Products</h1>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Create
          </button>
        </div>
        <div className="">
          <table className="border-separate w-full border-spacing-y-3">
            <thead>
              <tr>
                {/* <th className="border-y border-gray-300 font-semibold bg-white px-3 py-2 border-l rounded-l-lg">
                  SN
                </th> */}
                <th className="border-y border-gray-300 font-semibold bg-white px-3 py-2 text-center border-l rounded-l-lg">
                  Image
                </th>
                <th className="border-y border-gray-300 font-semibold bg-white px-3 py-2 text-left">
                  Title
                </th>
                {/* <th className="border-y border-gray-300 font-semibold bg-white px-3 py-2 text-left">
                  Platform
                </th> */}
                <th className="border-y border-gray-300 font-semibold bg-white px-3 py-2 text-left">
                  Category
                </th>
                <th className="border-y border-gray-300 font-semibold bg-white px-3 py-2 text-left">
                  Status
                </th>
                <th className="border-y border-gray-300 font-semibold bg-white px-3 py-2 border-r rounded-r-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="border-y border-gray-300 bg-white px-3 py-2 border-l rounded-l-lg text-center">
                      {
                        <div className="flex justify-center">
                          <img
                            className="h-9 w-9"
                            src={item.imageUrl}
                            alt={item.name}
                          />
                        </div>
                      }
                    </td>
                    <td className="border-y border-gray-300 bg-white px-3 py-2">
                      {item.name}
                    </td>
                    <td className="border-y border-gray-300 bg-white px-3 py-2">
                      {item.category.name}
                    </td>
                    <td className="border-y border-gray-300 bg-white px-3 py-2"></td>
                    <td className="border-y border-gray-300 bg-white px-3 py-2 border-r rounded-r-lg text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-2 rounded-lg hover:bg-blue-200 text-blue-700"
                          onClick={() => {
                            setSelected(item);
                            navigate(`/dashboard/admin/products/${item._id}`);
                            setOpen(true);
                          }}
                        >
                          <Edit2 size={19} />
                        </button>

                        <button
                          className="p-2 rounded-lg hover:bg-red-200 text-red-700"
                          onClick={() => {
                            setOpenDelMod(true);
                            setSelected(item);
                          }}
                          disabled={deleting}
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* product model  */}
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative w-full max-w-lg mx-4 sm:mx-0 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                {open && !id && (
                  <ProductForm
                    onClose={() => setOpen(false)}
                    product={product}
                    setProduct={setProduct}
                    onProductCreated={getAllProducts}
                  />
                )}

                {open && id && (
                  <ProductForm
                    onClose={() => setOpen(false)}
                    product={selected}
                    setProduct={setSelected}
                    onProductCreated={getAllProducts}
                  />
                )}
              </DialogPanel>
            </div>
          </div>
        </Dialog>

        {/* delete product model  */}
        <Dialog
          open={openDelMod}
          onClose={setOpenDelMod}
          className="relative z-10"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <ExclamationTriangleIcon
                        aria-hidden="true"
                        className="size-6 text-red-600"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Are You Sure
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Do you really want to delete {`"${selected?.name}"`}{" "}
                          product.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(selected._id);
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => {
                      setOpenDelMod(false);
                      // Delay clearing selectedProduct until after modal is hidden
                      setTimeout(() => setSelectedProduct(null), 100); // ✅ Clear selected state
                      // setSelected(null);
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </section>
    </AdminLayout>
  );
};

export default Products;
