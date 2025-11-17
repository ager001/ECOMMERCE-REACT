import orderModel from "../models/OrderModel.js"


// Placing orders using Mpesa-Method

const placeOrderMpesa = async (req,res) => {

}
// All Orders data for Admin Panel

const allOrders = async (req, res) => {

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

}

export {updateStatus, placeOrderMpesa, userOrders, allOrders}