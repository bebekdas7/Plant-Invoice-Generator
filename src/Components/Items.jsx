import React from 'react';
import "../style/Items.css";

const Items = ({ img, common_name, scientific_name, onDelete }) => {
  return (
    <>
      <section className="items">
        <div className="img-box">
          <img src={img} alt={common_name} />
        </div>
        <div className="items-detail">
          <p className="mb-1">{common_name}</p>
          <p className="mb-1">{scientific_name}</p>
        </div>
        <div className="items-btn">
          <button className="btn btn-danger" onClick={onDelete}>
          </button>
        </div>
      </section>
    </>
  );
};

export default Items;
