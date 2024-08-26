const express = require("express");
const formidable = require("express-formidable");
const authMiddleware = require("../middlewere/auth-middlewere");
const adminMiddleware = require("../middlewere/admin-middlewere");
const {
  createProductController,
  updateProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  productFiltersController,
  productcountcontroller,
  // productListcontroller,
  // searchproductcontroller,
  productListController,
  searchProductController,
  getrelatedproduct,

  getProductsByCategoryController,
  productCategoryController,
} = require("../controllers/prodcutcontroller");

const router = express.Router();

// Product CRUD Routes
router.post("/create-product", authMiddleware, adminMiddleware, formidable(), createProductController);
router.put("/update-product/:pid", authMiddleware, adminMiddleware, formidable(), updateProductController);
router.delete("/delete-product/:pid", authMiddleware, adminMiddleware, deleteProductController);

// Product Retrieval Routes
router.get("/get-products", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);

// Filtering and Searching
router.post("/product-filters", productFiltersController);
router.get("/product-count", productcountcontroller);
router.get("/product-list/:page", productListController);
router.get("/search/:keyword", searchProductController);


// similar product
router.get("/similar-product/:pid/:cid", getrelatedproduct);

// router.get('/product-category/:slug', getProductsByCategoryController);
router.get('/product-category/:slug', productCategoryController);






module.exports = router;
