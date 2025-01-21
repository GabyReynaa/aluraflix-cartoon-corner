import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./NuevoVideo.css";

const NuevoVideo = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState(""); // Valor vacío al principio
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [error, setError] = useState("");
  const [videos, setVideos] = useState([]); // Estado para manejar los videos

  // Función para convertir la URL de YouTube a formato embed
  const convertToEmbedUrl = (url) => {
    const regex = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);

    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    return url; // Si la URL no es un enlace de YouTube, devolverla tal cual.
  };

  // Función para obtener las categorías desde la API
  useEffect(() => {
    const fetchCategoriesAndVideos = async () => {
      try {
        const response = await fetch("https://my-json-server.typicode.com/GabyReynaa/aluraflix-cartoon-corner/videos");
        const videosData = await response.json();
        setVideos(videosData);

        // Obtener categorías únicas
        const uniqueCategories = [
          ...new Set(videosData.map((video) => video.category)),
        ];
        setCategories(uniqueCategories);
        setCategory(uniqueCategories[0] || ""); // Establecer la primera categoría por defecto
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategoriesAndVideos(); // Llamar para obtener las categorías y los videos
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que todos los campos estén llenos
    if (!title || !url || !category) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Convertir la URL de YouTube al formato embed
    const embedUrl = convertToEmbedUrl(url);

    // Crear un id único para el nuevo video
    const newId = Date.now(); // Usamos Date.now() para obtener un id único

    // Crear el objeto del video
    const newVideo = {
      id: newId, // Agregar un id único
      title,
      url: embedUrl, // Usar la URL convertida
      category,
    };

    try {
      // Hacer la solicitud POST para agregar el video
      const response = await fetch("https://my-json-server.typicode.com/GabyReynaa/aluraflix-cartoon-corner/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo), // Enviar el video con el id
      });

      if (!response.ok) {
        throw new Error("Error al agregar el video");
      }

      const savedVideo = await response.json();

      // Agregar el nuevo video al estado local sin necesidad de recargar la página
      setVideos((prevVideos) => [...prevVideos, savedVideo]);

      // Limpiar el formulario después de enviar el video
      setTitle("");
      setUrl("");
      setCategory(categories[0] || ""); // Resetear la categoría a la primera disponible
      setError(""); // Limpiar el error si todo sale bien
      alert("Video agregado exitosamente!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="nuevo-video-page">

      <main className="nuevo-video-main">
        <h2 className="nuevo-video-title">Nuevo Video</h2>

        {/* Mostrar error si hay */}
        {error && <p className="error-message">{error}</p>}

        <form className="nuevo-video-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Ingresa el título del video"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">URL del Video:</label>
            <input
              type="text"
              id="url"
              name="url"
              placeholder="Ingresa la URL del video"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría:</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {/* Mapeamos las categorías obtenidas dinámicamente */}
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))
              ) : (
                <option value="">Cargando categorías...</option>
              )}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Guardar Video
          </button>
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setUrl("");
              setCategory(categories[0] || ""); // Resetear la categoría al primer valor
              setError("");
            }}
            className="clear-btn"
          >
            Limpiar
          </button>
        </form>

        {/* Mostrar los videos de la categoría seleccionada */}
        <div>
          <h3>Videos de la categoría: {category}</h3>
          <div className="video-gallery">
            {videos
              .filter((video) => video.category === category)
              .map((video) => (
                <div key={video.id} className="video-card">
                  <iframe
                    width="300"
                    height="200"
                    src={video.url}
                    title={video.title}
                    allowFullScreen
                  />
                  <h4>{video.title}</h4>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NuevoVideo;
