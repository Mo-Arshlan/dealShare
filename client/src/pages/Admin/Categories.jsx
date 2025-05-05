import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import CategoryForm from "./components/CategoryForm";
import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  //* get all category
  const getAllCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/category/get-category`
      );
      setCategories(data?.categories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error while getting categories", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");

  //* delete category
  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        await getAllCategories();
        navigate("/dashboard/admin/categories");
        setDeleting(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setDeleting(false);
      toast.error("Something went wrong");
    }
  };

  //** */ modal
  const [open, setOpen] = useState(false);

  return (
    <AdminLayout>
      <main className="flex flex-col lg:flex-row gap-5 px-5 py-5 ">
        <div>
          {!id ? (
            <CategoryForm
              value={name}
              setValue={setName}
              onCategoryCreated={getAllCategories}
            />
          ) : (
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              onCategoryCreated={getAllCategories}
            />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-3 rounded-xl">
          <h1 className="text-xl">Categories</h1>

          <table className="border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="border-y border-gray-300 font-semibold bg-white px-3 py-2 border-l rounded-l-lg">
                  SN
                </th>
                <th className="border-y border-gray-300 font-semibold bg-white px-3 py-2 text-left">
                  Name
                </th>
                <th className="border-y border-gray-300 font-semibold bg-white px-3 py-2 border-r rounded-r-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((item, index) => {
                return (
                  <tr>
                    <td className="border-y border-gray-300 bg-white px-3 py-2 text-center border-l rounded-l-lg">
                      {index + 1}
                    </td>
                    <td className="border-y border-gray-300 bg-white px-3 py-2 text-left">
                      {item.name}
                    </td>
                    <td className="border-y border-gray-300 bg-white px-3 py-2 border-r rounded-r-lg">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-2 rounded-lg hover:bg-blue-200 text-blue-700"
                          onClick={() => {
                            setSelected(item);
                            setUpdatedName(item.name);
                            navigate(`/dashboard/admin/categories/${item._id}`);
                          }}
                        >
                          <Edit2 size={17} />
                        </button>

                        <button
                          className="p-2 rounded-lg hover:bg-red-200 text-red-700"
                          disabled={deleting}
                          onClick={() => {
                            setOpen(true);
                            setSelected(item);
                          }}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* delete category model  */}
        <Dialog open={open} onClose={setOpen} className="relative z-10">
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
                        Do you really want to delete {`"${selected?.name}"`} category.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(selected._id)
                      setOpen(false)
                      setSelected(null)
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => {
                      setSelected(null)
                      setOpen(false)
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
      </main>
    </AdminLayout>
  );
};

export default Categories;
