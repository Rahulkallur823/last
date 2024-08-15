const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
require("dotenv").config();
const fs = require("fs");
const formidable = require("express-formidable");


const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};



const register = async (req, res) => {
  try {
    // Formidable middleware will already parse the form data
    const { name, email, phone, password, address, answer } = req.fields;
    const { photo } = req.files;

    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const userCreated = new User({ name, email, phone, password, address, answer });

    if (photo) {
      userCreated.photo.data = fs.readFileSync(photo.path);
      userCreated.photo.contentType = photo.type;
    }

    await userCreated.save();

    const token = await userCreated.generateToken();

    res.status(201).json({
      msg: 'Registration Successful',
      token,
      userId: userCreated._id.toString(),
      user: userCreated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);
    if (isPasswordValid) {
      const token = await userExist.generateToken();
      res.status(200).json({
        msg: "Login Successful",
        token,
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Ensure you have imported your User model

const userProfileController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Ensure the user is accessing their own profile or is an admin
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Forbidden. You can't access this profile." });
    }

    const user = await User.findById(userId).select('name email phone address'); // Adjust fields as needed

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      userData: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });

  } catch (error) {
    console.error("Error fetching user profile data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};






module.exports = { home, register, login,userProfileController};
