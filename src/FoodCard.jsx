import React, { useState } from 'react';

function FoodCard ({name, date, index, handleOnFoodDelete, event}) {
  console.log()
  return (
    <div class='food-box-individual'key={index}>
      <div class='img-name'>
        <img src='bred.jpg' class='images'></img>
        <p class='name-text'>{name}</p>
      </div>
      <div class= 'exp-bar'>
        <p class='exp-text'>{date}</p>
      </div>
       {handleOnFoodDelete?<button onClick={(event)=>handleOnFoodDelete(event)} id={index}>delete</button>:null}
      {handleOnFoodDelete?<img src='can.svg' class='trashcan'></img> : null}
    </div>
  )
}
export default FoodCard;