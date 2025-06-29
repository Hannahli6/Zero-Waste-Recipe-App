import React, { useEffect, useState } from "react";
import "./App.css";
import FoodCard from "./FoodCard";
import { use } from "react";

function App() {
  const date = new Date();
  date.setDate(date.getDate() + 7); // modifies the original 'date' object
  const isoStringDateAfterOneWeek = date.toISOString().split("T")[0];
  const todayDate = new Date().toISOString().split("T")[0];

  const [selectedFoodType, setSelectedFoodType] = useState("carbs");
  const [ingredient, setIngredient] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [isCorrectFoodInput, setIsCorrectFoodInput] = useState("null");
  const [food, setFood] = useState({});
  const [foodList, setFoodList] = useState([
    { name: "apples", expiryDate: todayDate, type: "greens" },
    { name: "tuna", expiryDate: todayDate, type: "meat" },
    { name: "yogurt", expiryDate: todayDate, type: "dairy" },
  ]);
  const [nearExpireFoodArr, setNearExpireFoodArr] = useState([]);

  useEffect(() => {
    const nearExpireFoods = foodList.filter((food) => {
      return new Date(food.expiryDate) < new Date(isoStringDateAfterOneWeek);
    });
    setNearExpireFoodArr(nearExpireFoods);
  }, [foodList]);

  const fetchData = async () => {
    const nearExpireIngredients = nearExpireFoodArr.map((food) => {
      return food.name;
    });
    const ingredientsStr = nearExpireIngredients.join(`,+`);
    try {
      const response = await fetch(
        `https://zero-waste-recipe-app.onrender.com/api/recipes?ingredients=${ingredientsStr}`
      );
      const recipeData = await response.json();
      setRecipeList(recipeData);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipeList([]);
    }
  };

  const handleOnNameChange = (event) => {
    setFood({ ...food, name: event.target.value });
    setIngredient(event.target.value);
  };

  const handleOnDateChange = (event) => {
    setFood({ ...food, expiryDate: event.target.value });
  };

  const handleOnAdd = () => {
    if (food.name !== undefined && food.name !== "" && food.expiryDate) {
      setFoodList([...foodList, { ...food, type: selectedFoodType }]);
      setIsCorrectFoodInput(true);
    } else {
      setIsCorrectFoodInput(false);
      return null;
    }
  };

  const handleOnFoodDelete = (event) => {
    const id = Number(event.target.id);
    const newFoodList = foodList.filter((food, index) => {
      return id !== index;
    });
    setFoodList(newFoodList);
  };

  const goToNewLink = (spoonacularSourceUrl) => {
    window.open(`${spoonacularSourceUrl}`, "cooking-site");
  };

  const fetchRecipeInfo = async (recipe) => {
    const id = recipe.id;
    const response = await fetch(`https://zero-waste-recipe-app.onrender.com/api/recipe?id=${id}`);
    const recipeData = await response.json();
    const { spoonacularSourceUrl } = recipeData;
    // call new fucntion to go new link
    goToNewLink(spoonacularSourceUrl);
  };

  return (
    <div className="app">
      <h1>Your Pantry: Zero-Waste Recipes</h1>
      <hr></hr>

      <div id="container">
        <div className="pantry-section">
          <h2>Pantry</h2>
          <div id="pantry">
            <h3 className="table-header">Recent Items</h3>
            <h3 className="table-date">Expiry Date</h3>
          </div>
          <div className="food-box">
            {foodList.map((food, index) => {
              return (
                <FoodCard
                  name={food.name}
                  date={food.expiryDate}
                  key={index}
                  index={index}
                  handleOnFoodDelete={(event) => handleOnFoodDelete(event)}
                  foodType={food.type}
                />
              );
            })}
          </div>

          <div id="input-system">
            <div className="food-btn-section">
              {["greens", "carbs", "meat", "dairy", "sugar"].map((type) => {
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedFoodType(type)}
                    style={{
                      border:
                        selectedFoodType === type ? "3px solid #548377" : "",
                    }}
                  >
                    <img src={`/icons/icon-${type}.svg`} className="food-btn" />
                  </button>
                );
              })}
            </div>
            <div className="input-container">
              <input
                pattern="[A-Za-z]+"
                type="text"
                maxLength="18"
                className="item-input"
                placeholder="item name"
                value={ingredient}
                onChange={handleOnNameChange}
              />
              <input
                className="date-input"
                placeholder="expiry date"
                type="date"
                min="2022-02-05"
                onChange={handleOnDateChange}
              />
            </div>
            <button className="add-btn" onClick={handleOnAdd}>
              Add Food
            </button>
          </div>

          {isCorrectFoodInput === "null" || isCorrectFoodInput ? null : (
            <h4 className="error-message">
              Please insert a food name and an expiry date!
            </h4>
          )}
        </div>

        <div className="eat-me-first-section">
          <h2 className="emf-text">Eat Me First!</h2>
          <h4 className="emf-subheading">Food expiring within 1 week: </h4>
          <div id="eat-me-first">
            {nearExpireFoodArr.map((food, index) => {
              return (
                <FoodCard
                  key={index}
                  name={food.name}
                  date={food.expiryDate}
                  index={index}
                  foodType={food.type}
                />
              );
            })}
          </div>
        </div>

        <div className="recipe-section">
          <h2>Recipes</h2>
          <div id="recipes">
            <h3 className="recipe-subheading">Recommended Recipes:</h3>
            <div id="recipes-box">
              {recipeList.map((recipe, index) => {
                const { title, image } = recipe;
                return (
                  <div className="food-box-individual" key={index}>
                    <img src={image} className="images"></img>
                    <div className="recipe-text-container">
                      <p className="name-text">{title}</p>
                      <button
                        className="recipe-link-btn"
                        onClick={() => fetchRecipeInfo(recipe)}
                      >
                        cook now!
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="recipe-section-btns">
              <button className="recipe-btn" onClick={fetchData}>
                Find Recipes
              </button>
              <button
                className="recipe-btn"
                onClick={() => {
                  setRecipeList([]);
                }}
              >
                clear
              </button>
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
