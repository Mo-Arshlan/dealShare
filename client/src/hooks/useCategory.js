import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/category/get-category`
      );
      setCategories(data?.categories);
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, getCategories };
}
