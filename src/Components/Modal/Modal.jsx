import React, { useState } from "react";
import "./Modal.css";

const EditModal = ({ video, categories, onSave, onClose }) => {
    const [updatedVideo, setUpdatedVideo] = useState(video);
  
    // Función para manejar cambios en el formulario
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedVideo({ ...updatedVideo, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(updatedVideo); // Llamamos a onSave con los datos actualizados
    };
  
    return (
      <div className="modal" style={{ display: video ? "flex" : "none" }}>
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>Editar Card</h2>
          <form onSubmit={handleSubmit}>
            {/* Título del video */}
            <input
              type="text"
              name="title"
              value={updatedVideo?.title || ""}
              onChange={handleChange}
            />
            
            {/* Selección de categoría */}
            <select
              name="category"
              value={updatedVideo?.category || ""}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
  
            {/* URL del video */}
            <input
              type="text"
              name="url"
              value={updatedVideo?.url || ""}
              onChange={handleChange}
            />
  
            <div className="modal-buttons">
              <button type="submit">Guardar</button>
              <button type="button" onClick={onClose}>
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditModal;
