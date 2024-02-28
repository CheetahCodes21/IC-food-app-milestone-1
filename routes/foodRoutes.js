const express = require("express");
const router = express.Router();
const foodController = require("../controller/foodController");


// Routes
router.get("/foods", foodController.getFoods);
router.get("/foods/category/:category", foodController.getFoodsByCategory);
router.post("/foods", foodController.postFood);
router.get("/foods/search/:name", foodController.searchFoodByName);
router.get("/foods/suggest/:letters", foodController.searchFoodByLetters);

module.exports = router;