import React, { useState } from 'react';

function RecipeCard ({title, image, index}) {
  console.log()
  return (
    <div className='food-box-individual'key={index}>
      <div className='img-name'>
        <img src={image} className='images'></img>
        <p className='name-text'>{title}</p>
      </div>
      <div className= 'exp-bar'>
        <p className='exp-text'>{date}</p>
      </div>
    </div>
  )
}
export default RecipeCard;
