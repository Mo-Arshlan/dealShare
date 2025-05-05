import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavorite } from "../context/favorites";
import FavoriteButton from "../Components/FavoriteButton";

const Home = () => {

  const [favorites, setFavorites] = useFavorite();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
            Trending Deals
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col justify-between border border-gray-300 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="rounded-xl object-contain h-56 w-full mb-4"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    {/* <Heart
                      onClick={() => {
                        setFavorites([ ...favorites, product])
                        localStorage.setItem('favorites', JSON.stringify([...favorites, product]))
                        toast.success("Item added to favorites.")
                      }
                        
                      }
                    className="h-5 w-5 text-red-500 cursor-pointer" /> */}
                    <FavoriteButton product={product}/>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    {product.description.substring(0, 100)}...
                  </p>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm line-through text-gray-500">
                      ₹{product.oPrice}
                    </span>
                    <span className="text-lg font-bold text-green-700">
                      ₹{product.dPrice}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mt-4 gap-4">
                  <a
                    href={product.dealUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 w-full"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" /> Get Deal
                  </a>
                    
                    <button onClick={() => handleCopyLink(product.dealUrl)}>
                      <Share2 className="h-4 w-4 text-gray-600 hover:text-gray-900" />
                    </button>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
