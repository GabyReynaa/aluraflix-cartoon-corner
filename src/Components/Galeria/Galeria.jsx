import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Cards/Cards";
import videos from "../../Data/data";
import "./Galeria.css";

const Galeria = () => {
  const [favorites, setFavorites] = useState([]); // Favoritos del usuario
  const navigate = useNavigate();

  const navigateToCategory = (category) => {
    navigate(`/videos/${category}`);
  };

  // Función para alternar un video como favorito
  const handleFavoriteToggle = (videoId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(videoId)) {
        return prevFavorites.filter((id) => id !== videoId); // Quitar favorito
      } else {
        return [...prevFavorites, videoId]; // Agregar favorito
      }
    });
  };

  return (
    <div className="galeria">
      {/* Sección de videos principales */}
      <h2>Galería de Videos</h2>
      <div className="galeria__videos">
        {videos.length > 0 ? (
          videos.map((video) => (
            <Card
              key={video.id}
              id={video.id}
              title={video.title}
              image={video.image}
              onClick={() => navigateToCategory(video.category)}
              isFavorite={favorites.includes(video.id)} // Si el video está marcado como favorito
              onFavoriteToggle={handleFavoriteToggle} // Alternar favorito
            />
          ))
        ) : (
          <p>No hay videos disponibles</p>
        )}
      </div>

      {/* Sección de favoritos */}
      <h2>Favoritos</h2>
      <div className="galeria__favorites">
        {favorites.length > 0 ? (
          favorites.map((videoId) => {
            const video = videos.find((v) => v.id === videoId);
            return (
              <Card
                key={video.id}
                id={video.id}
                title={video.title}
                image={video.image}
                onClick={() => navigateToCategory(video.category)}
                isFavorite={true} // Solo mostrar como favorito
              />
            );
          })
        ) : (
          <p>No hay videos favoritos</p>
        )}
      </div>
    </div>
  );
};

export default Galeria;
