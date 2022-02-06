
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

const date = new Date();
const todayDate = date.setDate(date.getDate());
const dateAfterOneWeek = date.setDate(date.getDate() + 7);
const isoStringDateAfterOneWeek = date.toISOString().split('T')[0];

const fetchData = async () => {
  const ingredients = await foodList.map((food,index)=>{
    return food.name
  })
  const ingredientsStr = await ingredients.join(`,+`)
  console.log(ingredientsStr)
  const response = await fetch(`${URL}${apiKey}&ingredients=${ingredientsStr}`);
  const recipeData = await response.json();
  setRecipeList(recipeData);
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
    <div className="bg">
      <h1>Your Pantry: Food Inventory Tracker</h1>
      <div id="container">

        <div className='titles'>
          <h2>Pantry at a Glance</h2>
          <div id='pantry'>
            <h3 className='table-header'>Recent Items</h3>
            <h3 className='table-date'>Expiry Date</h3>
          </div>
          <div className='food-box'>
            {foodList.map((food, index)=>{
            return (
              <div className="expire-food-container" key={index}>
                <FoodCard name={food.name} date={food.expiryDate} key={index} index={index} handleOnFoodDelete={(event)=>handleOnFoodDelete(event)}/>
            </div>)
            })}
          </div>
          <div id='input-system'>
            <div className="input-container-wrapper">
              <div className="input-container">
                <input pattern="[A-Za-z]+" type="text" maxLength="18"className="item-input" placeholder="item name" value={ingredient} onChange={handleOnNameChange}/>
                <input className="date-input" placeholder="expiry date" type="date" min="2022-02-05" onChange={handleOnDateChange}/>
              </div>
            </div>
            <button className="add-btn" onClick={handleOnAdd}>Add Food</button>
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
            <h3 className="recipe-subheading">Recommended Recipes:</h3>
            <div id='recipes-box'>
              {recipeList.map((recipe, index)=>{
                const {title, image} = recipe;
                console.log(title, image);
                return (
                  <div className='food-box-individual' key={index}>
                    <div className='img-name'>
                      <img src={image} className='images'></img>
                      <p className='name-text'>{title}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="recipe-section-btns">
              <button className = "recipe-btn" onClick={fetchData}>Find Recipes</button>
              <button className = "recipe-btn" onClick={()=>{setRecipeList([])}}>clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

//WOOOOOOOO
// yaayyyyyyyyyyyyyyyyyyyyyyyyy