import React from "react";
import "./Cards.css";

const Card = ({ id, title, image, onClick }) => {
  return (
    <div className="card" onClick={() => onClick (id)}>
      <img src={image} alt={title} className="card__image" />
      <h2 className="card__title">{title}</h2>
    </div>
  );
};

export default Card;
