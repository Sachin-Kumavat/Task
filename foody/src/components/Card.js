import React from "react";
import "../css/Card.css";

const Card = ({ name, img, price, description }) => {
  return (
    <div className="card">
        <div className="card-content-container">
            <img src={img} alt={name} className="card-img" />
            <div className="card-content">
                <div className="card-details">
                    <h3 className="card-title">{name}</h3>
                    <p className="card-description">{description}</p>
                </div>
                <div className="button">
                    <span className="card-price">${price?.toFixed(2)}</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Card;
