import User from "../models/userModel.js";
import validator from "validator";
import { createJwtToken } from "../config/generateJwtToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "All fields required",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Email must be valid",
      });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password must be strong",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser || !(await findUser.isPasswordMatched(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({
    _id: findUser?._id,
    name: findUser?.name,
    username: findUser?.username,
    email: findUser?.email,
    token: createJwtToken(findUser?._id),
  });
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById(id);
    if (!singleUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(singleUser);
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select("-password");
    res.json(allUsers);
  } catch (error) {
    throw new Error(error);
  }
};
