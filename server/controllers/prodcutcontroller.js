const fs = require("fs");
const slugify = require("slugify");
const productModel = require("../models/productmodel");
const categoryModel = require("../models/categorymodel");

const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      discountedPrice,
      discount,
      rating
    } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !discountedPrice:
        return res.status(500).send({ error: "Discounted Price is Required" });
      case !discount:
        return res.status(500).send({ error: "Discount is Required" });
      case !rating:
        return res.status(500).send({ error: "Rating is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo should be less than 1MB" });
    }

    const products = new productModel({
      ...req.fields,
      slug: slugify(name)
    });

    if (photo && photo.path) {
      products.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type
      };
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products
    });
  } catch (error) {
    console.error("Error in createProductController:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product"
    });
  }
};




const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products",
      products
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product
    });
    console.log(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    console.log(product)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      discountedPrice,
      discount,
      rating
    } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !discountedPrice:
        return res.status(500).send({ error: "Discounted Price is Required" });
      case !discount:
        return res.status(500).send({ error: "Discount is Required" });
      case !rating:
        return res.status(500).send({ error: "Rating is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo should be less than 1MB" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name)
      },
      { new: true }
    );

    if (photo && photo.path) {
      products.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type
      };
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products
    });
  } catch (error) {
    console.error("Error in updateProductController:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product"
    });
  }
};









const productFiltersController = async (req, res) => {
  try {
    const { checked = [], radio = [] } = req.body;
    let filterArgs = {};

    // Add category filter if any
    if (checked.length > 0) {
      filterArgs.category = { $in: checked };
    }

    // Add price range filter if provided
    if (radio.length === 2) { // Ensure radio is an array with two elements
      const [minPrice, maxPrice] = radio.map(Number); // Convert to numbers
      // Ensure the minPrice and maxPrice are valid numbers
      if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice >= 0 && maxPrice >= minPrice) {
        filterArgs.price = { $gte: minPrice, $lte: maxPrice };
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid price range",
        });
      }
    }

    // Fetch filtered products
    const products = await productModel.find(filterArgs);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error in filtering products:", error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error: error.message,
    });
  }
};



const productcountcontroller = async (req, res) => {
  try {
    const total = await productModel.countDocuments(); // countDocuments is preferable for accuracy
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.error("Error while counting products:", error);
    res.status(400).send({
      success: false,
      message: "Error while counting products",
      error: error.message,
    });
  }
};



const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};





const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = parseInt(req.params.page) || 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    const total = await productModel.countDocuments(); // Get total product count
    res.status(200).send({
      success: true,
      products,
      total,
      perPage,
      page
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page product list"
    });
  }
};



const getrelatedproduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const products = await productModel.find({
      category: cid,
      _id: { $ne: pid }
    }).select("-photo").limit(4).populate("category");

    res.status(200).send({
      success: true,
      products
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in related product list"
    });
  }
};

const getProductsByCategoryController = async (req, res) => {
  try {
    // Find the category by slug
    const category = await categoryModel.findOne({ slug: req.params.slug });

    // If no category found, return an error
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // Fetch products associated with this category's _id
    const products = await productModel.find({ category: category._id }).populate("category").select("-photo");

    // Send the response with the found products
    res.status(200).json({
      success: true,
      message: `Products for category ${category.name}`,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching products by category",
      error: error.message,
    });
  }
};


const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};




// Call this function before your route handler
// debugCategoryAndProducts();



module.exports = {
  getProductController,
  createProductController,
  updateProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  productFiltersController,
  productListController,
  searchProductController,
  productcountcontroller,
  getrelatedproduct,
  getProductsByCategoryController,
  productCategoryController

};










