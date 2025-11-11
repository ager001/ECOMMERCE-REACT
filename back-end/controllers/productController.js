import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";




//FUNCTION FOR ADD PRODUCT
const addProduct = async (req,res)=>{
    // Define an asynchronous function named 'addProduct' to handle product creation requests

    try {
        // Destructure expected product fields from the request body
        // These are typically sent as text fields in a form-data POST request

        const {name, description, price, category, subCategory, sizes, bestseller } = req.body
        // Extract uploaded image files from req.files
        // Each field (image1, image2, etc.) is expected to contain an array of files


        // Extract the first uploaded file from the 'image1' field, if it exists.
// req.files.image1 is an array (because multer.fields() always returns arrays).
// If the field is missing, image1 will be undefined.

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // Create an array containing all extracted image objects.
// Some of these may be undefined if the admin didn't upload all four images.
        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined )
        // Upload all valid image files to Cloudinary in parallel using Promise.all.
// This ensures that all uploads complete before moving forward.
        let imagesUrl = await Promise.all(
            // For each image object in the 'images' array:
            images.map(async (item)=>{
                // Upload the image to Cloudinary using its local file path.
    // 'resource_type: image' tells Cloudinary to treat it as an image file.
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                // Return the secure URL of the uploaded image (hosted on Cloudinary).
    // This will be collected into the final 'imagesUrl' array.
                return result.secure_url
            })
        )

        // Create a new object called 'productData' to hold all the product details.
// This will be used to save the product to the database or send it in a response.
        const productData = {
            name,// Product name, extracted directly from req.body
            description,// Product description, also from req.body
            category,// Product category (e.g., "Shoes", "Clothing")
            price: Number(price),// Convert the price from string to number to ensure it's stored as a numeric value
            subCategory,// Sub-category of the product (e.g., "Sneakers", "Sandals")
             // Convert bestseller flag from string to boolean
             // If bestseller === "true", set to true; otherwise set to false
            bestseller: bestseller === "true" ? true : false,
            // Parse the sizes string into an array or object
           // Assumes 'sizes' was sent as a JSON string (e.g., '["S","M","L"]')
            sizes: JSON.parse(sizes),
            // Assign the array of image URLs returned from Cloudinary
          // These are the hosted links to the uploaded product images
            image: imagesUrl,
            // Record the current timestamp as the product's creation date
           // Date.now() returns the number of milliseconds 
            date: Date.now()

        }
        // Log the productData object to the console for debugging purposes.
        // This helps verify that all fields (name, price, images, etc.) are correctly structured before saving.
        console.log(productData);

        // Create a new instance of the product model using the productData object.
        // This prepares the product for insertion into the MongoDB database.
        const product = new productModel(productData);
         // Save the product instance to the database asynchronously.
         // This writes the product document into the 'products' collection. 
        await product.save()
        // Send a JSON response back to the client indicating success.
        // Includes a success flag and a confirmation message.

        res.json({success: true, message:'Product Added successfully '})
        
        
        // Respond with an empty JSON object (placeholder)
        // You should replace this with actual logic to save the product to a database

        res.json({})



    } catch (error) {
        // If any error occurs during processing, log it to the console

        console.log(error)
        // Respond with a JSON error message

        res.json({success: false, message: error.message});
    }

}

// FUNCTION FOR LIST PRODUCTS
// Define an asynchronous function called listProduct that handles a request and sends a response.
// This function is typically used as a controller in an Express route to list all products from the database.
const listProduct = async (req, res) => {
  try {
    // Attempt to retrieve all product documents from the MongoDB collection using the productModel.
    // The empty object {} means "find all documents" without any filtering criteria.
    const products = await productModel.find({});

    // If the retrieval is successful, send a JSON response back to the client.
    // The response includes a success flag and the list of products.
    res.json({ success: true, products });
  } catch (error) {
    // If an error occurs during the database query, log the error to the server console.
    console.log(error);

    // Send a JSON response indicating failure.
    // Include the error message to help the client understand what went wrong.
    res.json({ success: false, message: error.message });
  }
};
// FUNCTION FOR REMOVE PRODUCT
// Define an asynchronous function called removeProduct that handles a request and sends a response.
// This function is typically used as a controller in an Express route to delete a product from the database.
const removeProduct = async (req, res) => {
  try {
    // Attempt to delete a product from the database using its unique ID.
    // The ID is expected to be sent in the request body as req.body.id.
    // findByIdAndDelete() searches for the document by ID and removes it if found.
    await productModel.findByIdAndDelete(req.body.id);

    // If deletion is successful, send a JSON response back to the client.
    // The response includes a success flag and a confirmation message.
    res.json({ success: true, message: "Product successfully removed" });
  } catch (error) {
    // If an error occurs during the deletion process, log the error to the server console.
    console.log(error);

    // Send a JSON response indicating failure.
    // Include the error message to help the client understand what went wrong.
    res.json({ success: false, message: error.message });
  }
};
//FUNCTION FOR SINGLE PRODUCT INFO
// Define an asynchronous function called singleProduct that handles a request and sends a response.
// This function is typically used in an Express route to fetch a single product by its ID.
const singleProduct = async (req, res) => {
  try {
    // Destructure the productId from the request body.
    // This assumes the client sends a JSON object like { "productId": "some_id" }.
    const { productId } = req.body;

    // Use Mongoose's findById method to search for a product in the database by its unique ID.
    // This returns the product document if found, or null if not found.
    const product = await productModel.findById(productId);

    // Send a JSON response back to the client with a success flag and the product data.
    // If the product is null (not found), it will still return success: true with product: null.
    res.json({ success: true, product });
  } catch (error) {
    // If an error occurs (e.g., invalid ID format, database issue), log it to the server console.
    console.log(error);

    // Send a JSON response indicating failure, along with the error message.
    res.json({ success: false, message: error.message });
  }
};


export {listProduct, addProduct, removeProduct, singleProduct}