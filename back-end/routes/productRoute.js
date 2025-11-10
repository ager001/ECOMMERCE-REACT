//import the express library
import express from "express"
//imported all handler functions from the controller folder
import {listProduct, addProduct, removeProduct, singleProduct} from "../controllers/productController.js"

 //Create a new router instance
// This router will group all user-related routes together
const productRouter = express.Router();

//when the admin adds a new product
productRouter.post('/add', addProduct);
//when the admin removes an existing product
productRouter.post('/remove', removeProduct);
//when the admin provide details of a single product
productRouter.post('/single', singleProduct);
//when the admin requires the list of products
productRouter.get('/list', listProduct);


export default productRouter

