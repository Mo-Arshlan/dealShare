import { Heart, ShoppingCart } from "lucide-react";
import React from "react";

const Card = ({ product }) => {
  return (
    <>
      {/* <div
        key={product._id}
        className="group relative px-4 pt-2 pb-4 rounded-xl border-1 border-gray-400"
      >
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-700">
            {product.name}
          </h3>
          <span><Heart className="h-5 w-5" /></span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
          <div className="flex gap-2 items-baseline">
            <span className="text-sm font-light  text-gray-900">
              {product.Oprice}
            </span>
            <span className="text-lg font-medium text-green-800">
              {product.Dprice}
            </span>
          </div>
          <button className="flex justify-center gap-2 mt-2 bg-black rounded-lg text-white py-2 hover:bg-white hover:text-black hover:border-2-inset hover:border-gray-800 transition-all ease-in-out duration-300"><ShoppingCart className="h-5 w-5" /> Get Deal</button>
        </div>
      </div> */}
    </>
  );
};

export default Card;
