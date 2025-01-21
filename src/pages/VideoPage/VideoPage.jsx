import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditModal from "../../Components/Modal/Modal"; // Asegúrate de tener este componente
import "./VideoPage.css";

const VideoPage = () => {
  const { category } = useParams();
  const [categoryVideos, setCategoryVideos] = useState([]);
  const [favorites, setFavorites] = useState([]); // Guardamos los favoritos
  const [editVideoId, setEditVideoId] = useState(null); // Para controlar el modal de edición
  const [categories, setCategories] = useState([]); // Para manejar las categorías
  const navigate = useNavigate();

  // Función para alternar el estado de favorito
  const handleFavoriteToggle = (videoId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(videoId)
        ? prevFavorites.filter((id) => id !== videoId)
        : [...prevFavorites, videoId];

      // Guardar los nuevos favoritos en localStorage
      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return newFavorites;
    });
  };

  // Función para borrar un video
  const handleDelete = (videoId) => {
    setCategoryVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
  };

  // Función para abrir el modal de edición
  const handleEdit = (videoId) => {
    setEditVideoId(videoId); // Mostrar el modal
  };

  // Cargar los videos de la categoría seleccionada
  useEffect(() => {
    // Realizar solicitud GET a la API
    fetch("https://my-json-server.typicode.com/GabyReynaa/aluraflix-cartoon-corner/videos")
      .then((response) => response.json())
      .then((data) => {
        const filteredVideos = data.filter(
          (video) => video.category.toLowerCase() === category.toLowerCase()
        );
        setCategoryVideos(filteredVideos);
      })
      .catch((error) => console.error("Error al obtener los videos:", error));

    // Cargar los favoritos desde localStorage al montar el componente
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    // Obtener las categorías únicas
    fetch("https://my-json-server.typicode.com/GabyReynaa/aluraflix-cartoon-corner/videos")
      .then((response) => response.json())
      .then((data) => {
        const uniqueCategories = [...new Set(data.map((video) => video.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error al obtener las categorías:", error));
  }, [category]);

  const handleSave = (updatedVideo) => {
    setCategoryVideos((prevVideos) =>
      prevVideos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
    );
    navigate(`/videos/${updatedVideo.category}`);
  };

  return (
    <div className="video-page">
      <h2 className="video-page__title">Videos de la categoría: {category}</h2>
      <div className="video-page__gallery">
        {categoryVideos.length > 0 ? (
          categoryVideos.map((video) => (
            <div key={video.id} className="video-page__card">
              <iframe
                className="video-page__video"
                width="300"
                height="300"
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h3>{video.title}</h3>
              <button
                className="view-full-video-btn"
                onClick={() => navigate(`/videoPlayer/${video.id}`)}
              >
                Ver Video Completo
              </button>
              <img
                src={favorites.includes(video.id) ? "/images/Corazónrelleno.png" : "/images/Corazón.png"}
                alt="favorite"
                onClick={() => handleFavoriteToggle(video.id)}
                className="favorite-icon"
              />
              <button onClick={() => handleEdit(video.id)} className="edit-btn">
                Editar Card
              </button>
              <button onClick={() => handleDelete(video.id)} className="delete-btn">
                Borrar
              </button>
            </div>
          ))
        ) : (
          <p>No hay videos disponibles para esta categoría</p>
        )}
      </div>

      {editVideoId && (
        <EditModal
          video={categoryVideos.find((video) => video.id === editVideoId)}
          categories={categories}  // Aquí pasamos las categorías al modal
          onSave={handleSave}
          onClose={() => setEditVideoId(null)}
        />
      )}
    </div>
  );
};

export default VideoPage;
