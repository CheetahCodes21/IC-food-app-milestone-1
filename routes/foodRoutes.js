// foodRoutes.js

const express = require("express");
const router = express.Router();
const foodController = require("../controller/foodController");


// Routes
router.get("/foods", foodController.getFoods);
router.get("/foods/category/:category", foodController.getFoodsByCategory);
router.post("/foods", foodController.postFood);

module.exports = router;
