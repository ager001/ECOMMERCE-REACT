import orderModel from "../models/OrderModel.js"
import userModel from "../models/userModel.js";


//Placing orders using COD method

const placeOrder = async (req, res) =>{
        try {
            
            const {userId, items, address, amount} = req.body

            const orderData = {
                userId,
                items,
                address,
                amount,
                paymentMethod: 'cod',
                payment: false,
                date: Date.now()
            }

            const newOrder = new orderModel(orderData);

            await newOrder.save();

            await userModel.findByIdAndUpdate(userId, {cartData:{}});

            res.json({success: true, message:'Order Placed'})



        } catch (error) {
            console.log(error);
            res.json({success:false, message:error.message })
            
        }
}


// Placing orders using Mpesa-Method

const placeOrderMpesa = async (req,res) => {

}


// All Orders data for Admin Panel

const allOrders = async (req, res) => {
        try {
            
            const orders = await orderModel.find({})
            res.json({success:true, orders})


        } catch (error) {
            console.log(error)
            res.json({success:false, message:error.message})
        }
}

//user Order Data for front End

const userOrders = async (req, res)=>{
    try {
        
        const {userId} = req.body

        const orders = await orderModel.find({userId});
        res.json ({success: true, orders })


    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
        
    }
}

//update order status from Admin Panel

const updateStatus = async (req, res) =>{
       try {
        
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Status Updated'})


       } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
       }
}

export {updateStatus, placeOrderMpesa, userOrders, allOrders, placeOrder}