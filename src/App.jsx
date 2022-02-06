
import React, { useState } from 'react';
import './App.css';
import FoodCard from './FoodCard';

function App() {
const [foodList, setFoodList] = useState([]);
const [food, setFood] = useState({});
const [ingredient, setIngredient] = useState("");
const [recipeList, setRecipeList] = useState([]);
const URL = "https://api.spoonacular.com/recipes/findByIngredients?number=5&ignorePantry=true&ranking=1&apiKey="
const apiKey = "9afbea738e1647bc8b27819d46cf595e";
const TEMPURL = `https://pokeapi.co/api/v2/type/11`

const date = new Date();
const dateAfterOneWeek = date.setDate(date.getDate() + 7);
const isoStringDateAfterOneWeek = date.toISOString().split('T')[0];

const fetchData = async () => {
  const ingredients = await foodList.map((food,index)=>{
    return food.name
  })
  const ingredientsStr = await ingredients.join(`,+`)
  console.log(ingredientsStr)
  const response = await fetch(`${URL}${apiKey}&ingredients=${ingredientsStr}`);
  const recipeData = await response.json()
  setRecipeList(recipeData)
}

const handleOnNameChange = (event) =>{
  setFood({name: event.target.value});
  setIngredient(event.target.value);
  
}
const handleOnDateChange = (event) =>{
  setFood({...food, expiryDate: event.target.value});
}
const handleOnAdd = () =>{
  setFoodList([...foodList,food]);
}
const handleOnFoodDelete = (event) =>{
  const id = Number(event.target.id);
  const newFoodList = foodList.filter((food,index) => {
    return id !== index
  }); 
  setFoodList(newFoodList)
}
  return (
    <body className='bg'>
    <div>
      <h1>Your Pantry: Food Inventory Tracker</h1>
      <div id="container">
        <div className='titles'>
          <h2>Pantry at a Glance</h2>
          <div id='pantry'>
            <h3 className='table-header'>Recent Items</h3>
            <h3 className='table-date'>Exp. Date</h3>
            <div></div>
          </div>
          <div className='food-box'>
            {foodList.map((food, index)=>{
            return (
              <div className="expire-food-container" key={index}>
                <FoodCard name={food.name} date={food.expiryDate} key={index} index={index} handleOnFoodDelete={(event)=>handleOnFoodDelete(event)}/>
            </div>)
            })}
            <div className="input-container">
              <input className="item-input" placeholder="item name" value={ingredient} onChange={handleOnNameChange}/>
              <input className="date-input" placeholder="expiry date" type="date" onChange={handleOnDateChange}/>
              <button className="add-btn" onClick={handleOnAdd}>Add</button>
            </div>
          </div>
        </div>
        
        <div className='titles'>
          <h2 className='emf-text'>Eat Me First!</h2>
          <div id='eat-me-first'>
            {foodList.map((food, index)=>{
              return (
              <div className="">
                {food.expiryDate < isoStringDateAfterOneWeek? 
                <FoodCard name={food.name} date={food.expiryDate} key={index} index={index}/> : null}
              </div>
              )
            })}
          </div>
          
        </div>

        <div className='titles'>
         <h2>Recipes</h2>
          <div id='recipes'>
            <p>Recipe API here</p>
            <div id='recipes-box'>
              <p>ARGGGGGGG</p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
    </body>
  );
}

export default App;

//WOOOOOOOO
// yaayyyyyyyyyyyyyyyyyyyyyyyyy