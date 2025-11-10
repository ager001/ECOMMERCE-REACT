// Step 1: Import the mongoose library
// Mongoose is an ODM (Object Data Modeling) tool that helps us interact with MongoDB using JavaScript objects
import mongoose from "mongoose";

// Step 2: Define a schema
// A schema is like a blueprint for how data should be structured in the database
// We're creating a schema for products in an ecommerce collection

const productSchema = new mongoose.Schema({
  
  // Product name: must be a string and is required
  name: { type: String, required: true },

  // Product description: also a required string
  description: { type: String, required: true },

  // Product price: must be a number and is required
  price: { type: Number, required: true },

  // Product images: stored as an array (e.g., multiple image URLs), and required
  image: { type: Array, required: true },

  // Main category of the product (e.g., "Clothing", "Books"): required string
  category: { type: String, required: true },

  // Subcategory (e.g., "Shoes", "Novels"): also required
  subcategory: { type: String, required: true },

  // Available sizes (e.g., ["S", "M", "L"]): stored as an array and required
  sizes: { type: Array, required: true },

  // Bestseller flag: optional boolean to mark if the product is a top seller
  bestseller: { type: Boolean },

  // Date field: stored as a number (e.g., timestamp or year), and required
  date: { type: Number, required: true }
});

// Check if a model named "product" already exists in Mongoose's internal cache
// This prevents errors when the same model is defined multiple times (e.g., during hot reloads or in modular apps)
const productModel = mongoose.models.product 

  // If the model doesn't exist yet, create it using the schema we defined earlier
  || mongoose.model("product", productSchema);

  export default productModel

  {/*You have to create a schema and its model for exporting purpose */}