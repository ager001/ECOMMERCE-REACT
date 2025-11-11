//import the express library
import express from "express"
//imported all handler functions from the controller folder
import {listProduct, addProduct, removeProduct, singleProduct} from "../controllers/productController.js"
import upload from "../middleware/multer.js";

 //Create a new router instance
// This router will group all user-related routes together
const productRouter = express.Router();

//when the admin adds a new product
productRouter.post('/add', upload.fields([{name:'image1', maxCount:1}, {name:'image2', maxCount:1}, {name:'image3', maxCount:1}, {name:'image4', maxCount:1} ]), addProduct);
//when the admin removes an existing product
productRouter.post('/remove', removeProduct);
//when the admin provide details of a single product
productRouter.post('/single', singleProduct);
//when the admin requires the list of products
productRouter.get('/list', listProduct);


export default productRouter

