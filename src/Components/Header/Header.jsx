import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleNuevoVideoClick = () => {
    navigate("/nuevo-video"); // Redirige a la página de Nuevo Video
  };

  return (
    <header className="header">
      <div className="header__overlay">
      <div className="header__logo">
      <img src="/images/Logo 1.jpg" // Ruta relativa desde public
          alt="Cartoon Corner Logo"
          className="header__logo-img"/>
        <h1>Cartoon Corner</h1>
        </div>
      <nav className="header__nav">
        <Link to="/"className="header__btn">Home</Link> 
      
        <button className="header__btn" onClick={handleNuevoVideoClick}>Nuevo Video</button>
      </nav>
      </div>
    </header>
  );
};

export default Header;
