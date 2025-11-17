
import userModel from "../models/userModel.js"
//Add products to user Cart
// Define an asynchronous controller function to handle adding items to a user's cart
const addToCart = async (req, res) => {
    try {
        // Destructure userId, itemId, and size from the request body
        // These are expected to be sent from the frontend when a user adds an item to their cart
        const { userId, itemId, size } = req.body;

        // Fetch the user's data from the database using their ID
        // NOTE: This line has a typo — 'FindById' should be 'findById' (lowercase 'f')
        const userData = await userModel.findById(userId);

        // Access the user's current cart data from the retrieved user document
        // cartData is assumed to be an object structured like: { itemId: { size: quantity } }
        let cartData = await userData.cartData;

        // Check if the item already exists in the cart
        if (cartData[itemId]) {
            // If the item exists, check if the specific size exists
            if (cartData[itemId][size]) {
                // If the size exists, increment the quantity by 1
                cartData[itemId][size] += 1;
            } else {
                // If the size doesn't exist, initialize it with quantity 1
                cartData[itemId][size] = 1;
            }
        } else {
            // If the item doesn't exist in the cart, create a new entry
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        // Update the user's cart in the database with the modified cartData
        await userModel.findByIdAndUpdate(userId, { cartData });

        // Send a success response back to the client
        res.json({ success: true, message: 'Added to Cart' });

    } catch (error) {
        // If any error occurs during the process, log it and send a failure response
        console.log(error);
        res.json({ success: false, message: error.message });
    }
} 


//Update products to Cart

 
// Define an asynchronous function to handle updating a specific cart item
// This function is triggered by a POST request from the frontend
const updateCart = async (req, res) => {
    try {
        // Destructure the required fields from the request body
        // These values are sent by the client when updating an item in the cart
        const { userId, itemId, size, quantity } = req.body;

        // Fetch the user's data from the database using their unique ID
        // This retrieves the full user document, including their cart
        const userData = await userModel.findById(userId);

        // Access the cart data from the user document
        // cartData is expected to be an object structured like: { itemId: { size: quantity } }
        let cartData = await userData.cartData;

        // Update the quantity of the specified item and size in the cart
        // This directly modifies the nested value in the cartData object
        cartData[itemId][size] = quantity;

        // Save the updated cart back to the database
        // This overwrites the user's cartData field with the modified version
        await userModel.findByIdAndUpdate(userId, { cartData });

        // Send a success response to the client indicating the cart was updated
        res.json({ success: true, message: 'Cart just got updated' });

    } catch (error) {
        // If any error occurs during the process, log it for debugging
        console.log(error);

        // Send a failure response to the client with the error message
        res.json({ success: false, message: error.message });
    }
}

//Get User Cart data
 // Define an asynchronous function to handle retrieving a user's cart
// This function is triggered by a POST request from the frontend
const getUserCart = async (req, res) => {
    try {
        // Extract the userId from the request body
        // This ID is sent by the client to identify which user's cart to fetch
        const { userId } = req.body;

        // Use Mongoose's findById method to retrieve the user document from the database
        // This returns the full user data, including their cart
        const userData = await userModel.findById(userId);

        // Access the cartData field from the retrieved user document
        // cartData is expected to be an object structured like: { itemId: { size: quantity } }
        let cartData = await userData.cartData;

        // Send a JSON response back to the client with the cart data
        // The success flag indicates the operation was successful
        res.json({ success: true, cartData });

    } catch (error) {
        // If any error occurs during the process, log it to the console for debugging
        console.log(error);

        // Send a failure response to the client with the error message
        // This helps the frontend handle errors gracefully
        res.json({ success: false, message: error.message });
    }
}


export {addToCart, updateCart, getUserCart}