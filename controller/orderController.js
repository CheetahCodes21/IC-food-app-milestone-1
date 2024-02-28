// const Order = require('../models/order');
// const cron = require('node-cron');

// exports.placeOrder = async (req, res) => {
//     try {
//         const { userId, foodId, paymentMode } = req.body;

//         const newOrder = new Order({
//             userId,
//             foodId,
//             paymentMode
//         });

//         await newOrder.save();

//         // Schedule Node-Cron to update order status after 20 minutes
//         cron.schedule('*/20 * * * *', async () => {
//             await Order.findByIdAndUpdate(newOrder._id, { status: 'canceled' });
//         });

//         res.json({ success: true, message: 'Order placed successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// const mongoose = require('mongoose');
// const Order = require('../models/order');
// const multer = require('multer');
// const fs = require('fs');

// exports.placeOrder = async (req, res) => {
//     try {
//         const { userId, foodId, paymentMode, quantity } = req.body;

//         // Convert userId to ObjectId
//         const userIdObject =new mongoose.Types.ObjectId(userId);

//         const newOrder = new Order({
//             userId: userIdObject,
//             foodId,
//             paymentMode,
//             quantity,
//             orderId: generateOrderId(), // Function to generate a unique order ID
//             createdAt: new Date(),
//             updatedAt: new Date()
//         });

//         await newOrder.save();

//         res.json({ success: true, message: 'Order placed successfully', orderId: newOrder.orderId });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// exports.submitFeedback = async (req, res) => {
//     try {
//         const { rating, imageLink } = req.body;
//         const orderId = req.params.orderId;

//         // Optional: Handle file upload and extract text data
//         const textData = await extractTextFromFile(req.file);

//         // Update order with feedback data
//         const updatedOrder = await Order.findByIdAndUpdate(orderId, {
//             rating,
//             imageLink,
//             fileData: textData ? textData.link : null, // Store text data as a link
//             updatedAt: new Date()
//         }, { new: true });

//         if (!updatedOrder) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         res.json({ success: true, message: 'Feedback submitted successfully', updatedOrder });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Function to generate a unique order ID
// function generateOrderId() {
//     // Generate a random alphanumeric string or use a UUID generator library
//     return Math.random().toString(36).substr(2, 9).toUpperCase();
// }

// // Function to extract text from uploaded file and store it as a link
// async function extractTextFromFile(file) {
//     if (!file) {
//         return null;
//     }

//     try {
//         // Assuming 'extractTextFromUploadedFile' is a function to extract text from file
//         const extractedText = await extractTextFromUploadedFile(file.path);

//         // Save extracted text to a new file
//         const textFilePath = `uploads/text_${Date.now()}.txt`;
//         fs.writeFileSync(textFilePath, extractedText);

//         // Return the link to the extracted text file
//         return { link: textFilePath };
//     } catch (error) {
//         console.error('Error extracting text from file:', error);
//         return null;
//     }
// }

// // Placeholder function for text extraction 
// async function extractTextFromUploadedFile(filePath) {
//     return fs.readFileSync(filePath, 'utf-8');
// }

const Food = require("../models/food");

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchFoodByLetters = async (req, res) => {
  const { letters } = req.params;

  try {
    const foods = await Food.find({ name: { $regex: new RegExp(`^$letters}`, 'i') } });

    if (!foods || foods.length === 0) {
      return res.status(404).json({ error: "No matching foods found" });
    }

    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchFoodByName = async (req, res) => {
  const { name } = req.params;

  try {
    // Use a regular expression for case-insensitive search
    const regex = new RegExp(name, 'i');

    const foods = await Food.find({ name: regex });

    if (!foods || foods.length === 0) {
      return res.status(404).json({ error: "No matching foods found" });
    }

    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postFood = async (req, res) => {
  try {
    const { name, description, price, image,category } = req.body;

    // Validate the presence of required fields
    if (!name || !description || !price || !image || !category) {
      return res.status(400).json({ error: "Incomplete information for food item" });
    }

    // Create a new food item
    const newFood = new Food({
      name,
      description,
      price,
      image,
      category
    });

    // Save the food item to the database
    await newFood.save();

    res.status(201).json({ message: "Food item added successfully", food: newFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getFoodsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const foods = await Food.find({ category });
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};