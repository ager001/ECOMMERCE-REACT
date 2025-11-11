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
const listProduct = async (req,res)=>{

}
// FUNCTION FOR REMOVE PRODUCT
const removeProduct = async (req,res)=>{

}
//FUNCTION FOR SINGLE PRODUCT INFO
const singleProduct = async (req,res)=>{

}


export {listProduct, addProduct, removeProduct, singleProduct}