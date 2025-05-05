import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { Hammer, Loader2, Share2, ShoppingCart } from 'lucide-react'
import { useFavorite } from '../../context/favorites'
import FavoriteButton from '../../Components/FavoriteButton'

const Favorites = () => {

  const [favorites, setFavorites] = useFavorite();
  return (
    <Layout>
        <main className='flex flex-col gap-5 justify-center items-center p-5'>
          <h1 className='text-center font-semibold text-2xl'>Favorites</h1>
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
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
        </main>
    </Layout>
  )
}

export default Favorites