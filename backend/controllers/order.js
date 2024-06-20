import { Order } from "../models/order.js";
import { User } from "../models/user.js";

export const createOrder = async (req,res) => {
    try {
        const {items_ordered, quantity_ordered, status, total_price, ordered_by} = req.body
        
        const order = await Order.create({items_ordered, quantity_ordered, status, total_price, ordered_by})
        const user = await User.findByIdAndUpdate(ordered_by,
            { $push: { created_orders: order._id } },
            { new: true, useFindAndModify: false }
        )
        return res.status(200).json({order})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        let order = await Order.findById(id);
        if (!order) 
        {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = status;
        if (status === "Delivered") 
        {
            await Order.findByIdAndDelete(id);
            return res.status(200).json({ message: "Order delivered and removed from database" });
        } else {
            await order.save();
            return res.status(200).json({ message: "Order status updated" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const getOrders = async (req,res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        if(user)
        {
            return res.status(201).json(user.created_orders)
        }
        return res.status(500).json({error : error.message})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}



export const getOrderbyId = async (req,res) => {
    try {
        const orderid = req.params.id
        const order = await Order.findById(orderid)
        if(order)
        {
            return res.status(201).json({order})
        }
        return res.status(500).json({error : error.message})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const getCurrentOrders = async(req,res)=> {
    try{
        const orders = await Order.find({ status: { $in: ['Ready', 'Processing','Preparing'] }}).exec()
        return res.status(200).json({orders})
    }
    catch (error)
    {
        console.log("CHECK")
        res.status(500).json({error : error.message})
    }
}