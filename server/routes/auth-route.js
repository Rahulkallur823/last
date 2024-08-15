const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewere/validate-middlewere");
const signupSchema = require("../validators/auth-validate");

// const formidable = require("express-formidable");

const User = require("../models/usermodel");
const authMiddleware = require("../middlewere/auth-middlewere");

const formidable = require("express-formidable");

router.route("/").get(authControllers.home);
router.post("/register",formidable(),validate(signupSchema), authControllers.register);



//   // User authentication route
router.get('/user-auth', authMiddleware, (req, res) => {
  res.status(200).json({ ok: true });
});


router.get('/user-auth2', authMiddleware, async (req, res) => {
  try {
    const user = req.user; // User data set by authMiddleware

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    // Prepare response data
    const responseData = {
      ok: true,
      user: {
        email: user.email,
        phone: user.phone,
        address: user.address,
        // Only include photo URL if it exists
        photo: user.photo ? {
          url: `http://localhost:7000/api/v1/auth/user/photo/${user._id}`,
          contentType: user.photo.contentType
        } : null
      }
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
});


router.get('/user-info', authMiddleware, async (req, res) => {
  try {
    // Assuming req.user is populated by your authMiddleware
    const user = await User.findById(req.user.id); // Adjust according to your model and middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ userData: user }); // Return user data
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "This is a protected route", user: req.user });
});

router.route("/login").post(authControllers.login);

// router.get('/user/photo/:uid', authControllers.userPhotoController)



// routes/user-routes.js

// Route to upload user photo

router.get('/user/photo/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.photo || !user.photo.data) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    res.set("Content-Type", user.photo.contentType);
    res.status(200).send(user.photo.data);
  } catch (error) {
    console.error("Error fetching user photo:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

)




// Example route in your Express app
router.get('/user/profile/:userId', authMiddleware,authControllers.userProfileController);



















router.get('/check-user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json({
        success: true,
        message: 'User found',
        user
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    console.log('Error in check-user route:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking user', 
      error
    });
  }
});




module.exports = router;