import { useState, useContext, createContext, useEffect } from "react";

const FavoriteContext = createContext();
const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let existingFavoriteItem = localStorage.getItem("favorites");
    if (existingFavoriteItem) setFavorites(JSON.parse(existingFavoriteItem));
  }, []);

  return (
    <FavoriteContext.Provider value={[favorites, setFavorites]}>
      {children}
    </FavoriteContext.Provider>
  );
};

// custom hook
const useFavorite = () => useContext(FavoriteContext);

export { useFavorite, FavoriteProvider };