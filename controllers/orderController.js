import Order from '../models/orderModel.js';

// create
export const createOrder = (async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// update
export const updateOrder = (async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedOrder);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// delete
export const deleteOrder = (async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json("Product deleted from Order");
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get user order
export const getOrder = (async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id });
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get all orders
export const getAllOrders = (async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get montly income
export const getIncome = (async (req, res) => {
    const productId = req.query.pid; 
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth }, ...(productId && {
                products: {$elemMatch : { productId }}
            }) } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                },
            },
        ]);
        return res.status(200).json(income);
    } catch (err) {
        return res.status(500).json(err);
    }
})
