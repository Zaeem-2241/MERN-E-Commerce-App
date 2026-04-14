import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

export const protect = async (req, res, next) => {
  // console.log(req.headers);
  // console.log(req.methods);

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //   console.log("token", token);

      //verify tokem
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decoded", decoded);

      req.user = await Users.findById(decoded.id).select("-password");
      //   console.log(req.user);

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "No authorized , no token" });
  }
};
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as admin" });
  }
};
