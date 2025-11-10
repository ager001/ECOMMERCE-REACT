// Step 1: Import the mongoose library
// Mongoose is an ODM (Object Data Modeling) tool that helps us define schemas and interact with MongoDB using JavaScript
import mongoose from "mongoose";

// Step 2: Define a schema for user documents
// A schema is like a blueprint that describes the structure and rules for each user record in the database
const userSchema = new mongoose.Schema({

  // 'name' field: must be a string and is required (cannot be empty)
  name: { type: String, required: true },

  // 'email' field: must be a string, required, and must be unique across all users
  // This prevents duplicate email registrations
  email: { type: String, required: true, unique: true },

  // 'password' field: must be a string and is required
  // In a real app, this should be hashed before saving to the database
  password: { type: String, required: true },

  // 'cartData' field: stores the user's shopping cart as an object
  // Default value is an empty object if not provided
  cartData: { type: Object, default: {} }

}, {
  // Schema options: 'minimize: false' ensures empty objects like {} are saved as-is
  // This is useful if you want to preserve the cartData field even when it's empty
  minimize: false
});
// Step 3: Create or reuse the user model
// This line checks if a model named 'user' already exists in Mongoose's internal cache
// If it exists (e.g., during hot reloads), it reuses it
// Otherwise, it creates a new model using the 'userSchema'
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

// Step 4: Export the model so it can be imported and used in other files
// This allows you to use 'userModel' to create, read, update, or delete users in your app
export default userModel;