import React, { useState } from 'react';

function FoodCard ({name, date, index, handleOnFoodDelete, event, foodType}) {
  console.log()
  const imgURL = "icons/icon-"+ foodType + ".svg";
  return (
    <div className='food-box-individual'key={index}>
        <img src={imgURL} className='images'></img>
        <p className='name-text'>{name}</p>
        <p className='exp-text'>{date}</p>
       {handleOnFoodDelete?<button className="delete-btn" onClick={(event)=>handleOnFoodDelete(event)} id={index}>
       <img src='../images/can.svg' className='can-img'></img>
       </button>:null}
      
    </div>
  )
}
export default FoodCard;