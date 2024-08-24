import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../store/Auth";
import { FaBox, FaRupeeSign, FaPercent, FaStar, FaTruck, FaUpload } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdDescription } from 'react-icons/md';

const CreateProduct = () => {
  // ... (previous state and functions remain unchanged)
  const { AuthorizationToken } = useAuth();
const navigate = useNavigate();
const [categories, setCategories] = useState([]);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [originalPrice, setOriginalPrice] = useState("");
const [discountedPrice, setDiscountedPrice] = useState("");
const [discount, setDiscount] = useState("");
const [rating, setRating] = useState("");
const [category, setCategory] = useState("");
const [quantity, setQuantity] = useState("");
const [shipping, setShipping] = useState("");
const [photo, setPhoto] = useState("");

// Get all categories
const getAllCategories = async () => {
  try {
    const response = await fetch('http://localhost:7000/api/v1/category/get-category', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthorizationToken,
      },
    });

    if (!response.ok) { 
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.success) {
      setCategories(data.category);
    } else {
      console.log(data.message);
      alert(data.message);
    }
  } catch (error) {
    console.log('Failed to fetch categories.');
    console.error('Failed to fetch categories:', error);
  }
};

useEffect(() => {
  getAllCategories();
}, []);

const handleCreate = async (e) => {
  e.preventDefault();
  
  try {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("originalPrice", originalPrice);
    productData.append("discountedPrice", discountedPrice);
    productData.append("discount", discount);
    productData.append("rating", rating);
    productData.append("quantity", quantity);
    productData.append("photo", photo);
    productData.append("category", category);
    productData.append("shipping", shipping);

    const response = await fetch("http://localhost:7000/api/v1/product/create-product", {
      method: "POST",
      headers: {
        Authorization: AuthorizationToken,
      },
      body: productData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json().catch(() => {
      throw new Error('Failed to parse JSON');
    });

    if (data.success) {
      toast.success("Product Created Successfully");
      navigate("/admin/product");
    } else {
      toast.error(data?.message || "Failed to create product");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};

  return (
    <div className="container-fluid min-vh-100 py-5" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header text-white text-center py-4" style={{background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)'}}>
              <h2 className="font-weight-bold mb-0">
                <FaBox className="me-2" />
                Create Awesome Product
              </h2>
            </div>
            <div className="card-body p-5">
              <form onSubmit={handleCreate}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <label htmlFor="name">Product Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories?.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="category">
                        <BiCategoryAlt className="me-2" />
                        Category
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-floating mb-4">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    id="description"
                    style={{ height: "100px" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                  <label htmlFor="description">
                    <MdDescription className="me-2" />
                    Description
                  </label>
                </div>

                <div className="row mb-4">
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                      <label htmlFor="price">
                        <FaRupeeSign className="me-2" />
                        Price (INR)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="originalPrice"
                        placeholder="0"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                      />
                      <label htmlFor="originalPrice">
                        <FaRupeeSign className="me-2" />
                        Original Price
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="discountedPrice"
                        placeholder="0"
                        value={discountedPrice}
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                      />
                      <label htmlFor="discountedPrice">
                        <FaRupeeSign className="me-2" />
                        Discounted Price
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="discount"
                        placeholder="0"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                      />
                      <label htmlFor="discount">
                        <FaPercent className="me-2" />
                        Discount (%)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="rating"
                        placeholder="0"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="0"
                        max="5"
                        step="0.1"
                      />
                      <label htmlFor="rating">
                        <FaStar className="me-2" />
                        Rating
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        placeholder="0"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                      <label htmlFor="quantity">Quantity</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="shipping"
                        value={shipping}
                        onChange={(e) => setShipping(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                      <label htmlFor="shipping">
                        <FaTruck className="me-2" />
                        Shipping
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="btn btn-outline-primary w-100 py-3">
                    <FaUpload className="me-2" />
                    {photo ? photo.name : "Upload Product Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>

                {photo && (
                  <div className="text-center mb-4">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className="img-fluid rounded"
                      style={{ maxHeight: "300px" }}
                    />
                  </div>
                )}

                <div className="d-grid">
                  <button type="submit" className="btn btn-lg text-white" style={{background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)'}}>
                    <FaBox className="me-2" />
                    Create  Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;