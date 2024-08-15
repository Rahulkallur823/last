const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers["authorization"];
  console.log("Authorization Header:", token); // Log the entire Authorization header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided" });
  }

  // Remove "Bearer" prefix if present
  const jwtToken = token.startsWith("Bearer ") ? token.slice(7).trim() : token;
  console.log("JWT Token after removing 'Bearer':", jwtToken); // Log the JWT token after removing 'Bearer'

  if (!jwtToken) {
    return res.status(401).json({ message: "Unauthorized. Token is missing after 'Bearer'." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log("Decoded JWT:", decoded); // Log the decoded JWT payload

    // Find the user based on the email from the token
    const userData = await usermodel.findOne({ email: decoded.email }).select("-password");
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    // Attach user data and token to the request object
    req.token = jwtToken;
    req.user = userData;
    req.userID = userData._id;

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error during token verification or user lookup:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
