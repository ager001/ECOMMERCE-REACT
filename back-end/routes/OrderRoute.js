import express from 'express'
import {updateStatus, placeOrderMpesa, userOrders, allOrders, placeOrder} from '../controllers/OrderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();
// Admin Features
orderRouter.post('/list',adminAuth ,allOrders);
orderRouter.post('/status',adminAuth ,updateStatus);

// Payment Features
{/*cash on delivery */}
orderRouter.post('/place', authUser, placeOrder );
{/*lipa na mpesa */}
orderRouter.post('/mpesa', authUser, placeOrderMpesa );

//User Feature
orderRouter.post('/userorders',authUser, userOrders );

export default orderRouter