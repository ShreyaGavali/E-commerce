import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// update user
export const updateUser = (async(req, res) => {
    try{
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        return res.status(200).json(updatedUser);
    }catch(err){
        return res.status(500).json(err);
    }
});

// delete user
export const deleteUser = (async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted");
    }catch(err){
        return res.status(500).json(err);
    }
});

// get user
export const getUser = (async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    }catch(err){
       return res.status(500).json(err);
    }
});

// get all users
export const getAllUser = (async (req, res) => {
    const query = req.query.new
    try{
        const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();
        return res.status(200).json(users);
    }catch(err){
        return res.status(500).json(err);
    }
});

// get user stats
export const getUserStat = (async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try{
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear }}},
            {
                $project: {
                    month: {$month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ]);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
})