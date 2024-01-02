import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "Email with that user already exist",
    });
  }
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Email must need to be valid! dude",
    });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json("Password must need to be strong brother");
  }
};
