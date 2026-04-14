import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

const genrateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

//
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const userExist = await Users.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    //register user
    const user = await Users.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genrateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  
  //check user exist
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin : user.isAdmin,
        token: genrateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (error) {
    console.error("Login error", error.message);
    
    res.status(500).json({ message: error.message });
  }
};
