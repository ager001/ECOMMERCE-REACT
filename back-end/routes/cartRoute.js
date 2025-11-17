// Import the Express framework to create a router instance
import express from 'express'

// Import specific controller functions that handle cart-related logic
// These are defined in a separate file to keep concerns modular and organized
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js';

// Create a new router instance to define cart-related routes
const cartRouter = express.Router()

// Define a POST route at '/get' that triggers the getUserCart controller
// Typically used to fetch the current user's cart data
cartRouter.post('/get', authUser ,getUserCart);

// Define a POST route at '/add' that triggers the addToCart controller
// Used to add a new item to the user's cart
cartRouter.post('/add', authUser ,addToCart);

// Define a POST route at '/update' that triggers the updateCart controller
// Used to modify quantities or details of items already in the cart
cartRouter.post('/update', authUser , updateCart);

// Export the router so it can be used in the main app (e.g., app.js)
// This keeps route definitions modular and maintainable
export default cartRouter