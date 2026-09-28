require('dotenv').config(); // Load sensitive environment variables from .env file
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

app.use(express.json());
app.use(cors());

// Secure connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Home Route
app.get("/", function (req, res) {
  res.send("Welcome to Smart Meal Planner API");
});

// 1. GET: Fetch saved recipes for a specific user session (User's personal saved page)
app.get("/saved-recipes/:sessionId", async function (req, res) {
  const sessionId = req.params.sessionId;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM user_saved_recipes WHERE user_session_id = ?", 
      [sessionId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    res.status(500).json({ error: "Failed to fetch saved recipes" });
  }
});

// 2. POST: Save a recipe to the user's personal collection & developer analytics database
app.post("/saved-recipes", async function (req, res) {
  const { sessionId, recipeName, category, imageUrl } = req.body;
  
  if (!sessionId || !recipeName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await pool.query(
      "INSERT INTO user_saved_recipes (user_session_id, recipe_name, category, image_url) VALUES (?, ?, ?, ?)",
      [sessionId, recipeName, category, imageUrl]
    );
    res.status(201).json({ message: "Recipe saved successfully!" });
  } catch (error) {
    console.error("Error saving recipe to database:", error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
});

// 3. GET: Fetch recipes from external internet API (TheMealDB)
app.get("/external-recipes/:ingredient", async function (req, res) {
  const searchTerm = req.params.ingredient;
  try {
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await apiResponse.json();

    res.json(data.meals);
  } catch (error) {
    console.error("Error fetching external recipes:", error);
    res.status(500).json({ error: "Failed to fetch external recipes" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server is running securely on port ${PORT}`);
});
