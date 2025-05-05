import { Heart } from "lucide-react";
import { useFavorite } from "../context/favorites";
import toast from "react-hot-toast";


const FavoriteButton = ({ product }) => {
  const [favorites, setFavorites] = useFavorite();

  const isFavorite = favorites.some(p => p._id === product._id); // match by unique id

  const toggleFavorite = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(p => p._id !== product._id);
      toast.success("Item removed from favorites.");
    } else {
      updatedFavorites = [...favorites, product];
      toast.success("Item added to favorites.");
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Heart
      onClick={toggleFavorite}
      className={`cursor-pointer text-red-500 ${isFavorite ? " fill-red-500" : ""}`}
    />
  );
};

export default FavoriteButton;
