import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookies } from "../utils/feature.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password"
      });
    }

    sendCookies(res, 201, `Welcome back, ${user.name}`, user);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Your logic for getting all users (if needed)
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookies(res, 201, "Registered Successfully", user);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

export const getMyDetails = async (req, res) => {
  try {
    // Your logic for getting user details (if needed)
    // You can access the current user's details using 'req.user'
    const id = "myid";

    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error("Error getting user details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()) })
      .json({
        success: true,
        user: req.user
      });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

// export const getAllUsers = async (req,res)=>{

//     const users = await User.find({});

//         res.json(
//             {success: true,
//             users:users});
//     }

// export const register = async (req,res)=>{

//     const {name,username,password} = req.body;

// await User.create({
//     name,username,password
// });

//     res.status(201).json(
//         {success: true,
//         message:"User created successfully"});
// }

// export const getUserwithId = async (req,res)=>{

//     const {id} = req.params;
//     const user = await User.findById(id);

//     console.log(req.params);
//         res.json({success: true,
//             user});
// }

// export const deleteUserwithId = async (req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);
//     await user.deleteOne();
//     console.log(req.params);
//     res.json({success: true,message:"Deleted"});
// }

// export const updateUserwithId = async (req,res)=>{

//     const {id} = req.params;
//     const user = await User.findById(id);

//     console.log(req.params);
//         res.json({success: true,
//             message:"Updated"});
// }
