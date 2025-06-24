const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

app.use(cors()); //allow cross-origin requests

// find all recipes by ingredients
app.get("/api/recipes", async (req, res) => {
  const { ingredients } = req.query;
  const apiRes = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?number=25&ignorePantry=true&ranking=1&apiKey=${process.env.API_KEY}&ingredients=${ingredients}`
  );
  const data = await apiRes.json();
  res.json(data);
});

// find a specific recipe by id
app.get("/api/recipe", async (req, res) => {
  console.log(req.query);
  const { id } = req.query;
  const  specificRecipeRes= await fetch (`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.API_KEY}`);
  const specificRecipeData = await specificRecipeRes.json();
  res.json(specificRecipeData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
