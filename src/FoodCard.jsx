import React, { useState } from 'react';

function FoodCard ({name, date, index, handleOnFoodDelete, event, foodType}) {
  console.log()
  const imgURL = "icons/icon-"+ foodType + ".svg";
  return (
    <div className='food-box-individual'key={index}>
      <div className='img-name'>
        <img src={imgURL} class='images'></img>
        <p className='name-text'>{name}</p>
      </div>
      <div className= 'exp-bar'>
        <p className='exp-text'>{date}</p>
      </div>
       {handleOnFoodDelete?<button className="delete-btn" onClick={(event)=>handleOnFoodDelete(event)} id={index}>
       <img src='can.svg' class='can-img'></img>
       </button>:null}
      
    </div>
  )
}
export default FoodCard;