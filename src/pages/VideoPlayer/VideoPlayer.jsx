import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const { id } = useParams();  // Obtener el ID del video desde la URL
  const [video, setVideo] = useState(null);  // Guardamos el video a mostrar
  const navigate = useNavigate();

  // Función para obtener el video de la API
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`https://my-json-server.typicode.com/GabyReynaa/aluraflix-cartoon-corner/videos/${id}`);
        if (!response.ok) {
          throw new Error("Video no encontrado");
        }
        const videoData = await response.json();
        setVideo(videoData);  // Establecer el video para mostrarlo
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchVideo();  // Llamar a la función para obtener el video
  }, [id]);

  if (!video) {
    return <p>Cargando video...</p>;
  }

  return (
    <div className="video-player">
      <button onClick={() => navigate(`/videos/${video.category}`)} className="back-btn">
        Regresar a la categoría
      </button>
      <h2>{video.title}</h2>
      <iframe
        className="video-player__iframe"
        width="100%"
        height="500px"
        src={video.url}
        title={video.title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
