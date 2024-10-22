import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

// Register
export const registerUser = (async (req, res) => {
  try {
    // Check if username is already taken
    const existingUserName = await User.findOne({ userName: req.body.userName });
    if (existingUserName) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    // Check if email is already registered
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // If both username and email are available, proceed with user creation
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json({ message: "Server error. Please try again later." });
  }

})

// Login
export const loginUser = (async (req, res) => {
    try{
        const user = await User.findOne({userName: req.body.userName});
        if(!user){
            return res.status(401).json("User not found");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(401).json("Invalid Password");
        }
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            {expiresIn:"3d"}
        )
        const { password, ...others} = user._doc;
        return res.status(200).json({...others, accessToken});
    }catch (err){
        return res.status(500).json(err);
    }
})
