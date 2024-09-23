import React from 'react';
import "../style/Cards.css";

const Cards = ({ id, common_name, scientific_name, imgURL, onSelect }) => {
  return (
    <>
      <section className='card-main'>
        <div className="card-img">
          <img src={imgURL} alt="plant image" />
        </div>
        <div className="card-detail">
          <p>{common_name}</p>
          <p>{scientific_name}</p>
          <button className='btn btn-primary' onClick={onSelect}>Select</button>
        </div>
      </section>
    </>
  );
};

export default Cards;
