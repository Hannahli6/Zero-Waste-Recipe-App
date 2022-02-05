import React, { useState } from 'react';
import './App.css';

function App() {
const [foodList, setFoodList] = useState([]);
const [food, setFood] = useState({});
const [ingredient, setIngredient] = useState("");
const [expiryDate, setExpiryDate] = useState("");

const handleOnNameChange = (event) =>{
  setFood({name: event.target.value});
  setIngredient(event.target.value);
}
const handleOnDateChange = (event) =>{
  console.log({...food, expiryDate: event.target.value})
  setFood({...food, expiryDate: event.target.value});
}
const handleOnAdd = () =>{
  setFoodList([...foodList,food]);
  console.log(foodList)
}
  return (
      <div>
        <h1>Zero Waste Receipe App</h1>
        {foodList.map((food, index)=>{
          console.log(food)
          return <div className="expire-food-container">
          <div className="food-card" key={index}>
            <span>{food.name}</span>
            <span>Exp: {food.expiryDate}</span>
          </div>
        </div>
        })}
        
          <input placeholder="item name" value={ingredient} onChange={handleOnNameChange}/>
          <input placeholder="expiry date" type="date" onChange={handleOnDateChange}/>
          <button onClick={handleOnAdd}>Add</button>
      </div>
  );
}

export default App;

//WOOOOOOOO
// yaayyyyyyyyyyyyyyyyyyyyyyyyy