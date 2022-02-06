import React, { useState } from 'react';

function FoodCard ({name, date, index, handleOnFoodDelete, event}) {
  console.log()
  return (
    <div className='food-box-individual'key={index}>
      <div className='img-name'>
        <img src='bred.jpg' class='images'></img>
        <p className='name-text'>{name}</p>
      </div>
      <div className= 'exp-bar'>
        <p className='exp-text'>{date}</p>
      </div>
       {handleOnFoodDelete?<button className="delete-btn" onClick={(event)=>handleOnFoodDelete(event)} id={index}>delete</button>:null}
      
    </div>
  )
}
export default FoodCard;