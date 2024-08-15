//require express
const express = require('express');
const authMiddleware = require('../middlewere/auth-middlewere');
const adminmiddlewere = require('../middlewere/admin-middlewere');
// const getallusers = require('../controllers/admin-controller');
//categorycontroller
const categoryController = require('../controllers/categoryController');
const router = express.Router();

//router






router.post('/create-category',authMiddleware,adminmiddlewere,categoryController.createCategoryController);

module.exports=router;
