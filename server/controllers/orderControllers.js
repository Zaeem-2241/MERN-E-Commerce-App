import Orders from "../models/Orders.js";

export const createOrder =async (req, res) => {
    const { orderItems , totalPrice } = req.body;
    console.log(orderItems);
    
    if(orderItems.length === 0) {
        return res.status(400).json({ message : "No order Items"})
    }
    const order = new Orders({
        user : req.user._id,
        orderItems,
        totalPrice,
        isPaid : true,
        paidAt : Date.now(),
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
};

export const getAllOrders =async (req, res)=> {
    try {
        const orders = await Orders.find().populate("user", "name email");
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message : error.message})
    }
};

export const updateOrderStatus =async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Orders.findById(req.params.id)

        if(!status){
            return res.status(404).json({ message : "Order not found"})
        }

        order.status = status;

        if( status === "Delivered") {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        const updated = await order.save();
        res.json(updated)
    } catch (error) {
        res.status(500).json({ message : error.message})
    }
};