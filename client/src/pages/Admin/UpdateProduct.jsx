import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import {
  PencilSquare,
  TrashFill,
  Upload,
  Star,
  CurrencyDollar,
  BoxSeam,
} from "react-bootstrap-icons";

const UpdateProduct = () => {
  const params = useParams();
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
  const [id, setId] = useState("");

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
        setCategories(data?.category);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategories();
    getSingleProduct();
  }, []);

  const getSingleProduct = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/v1/product/get-product/${params.slug}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setOriginalPrice(data.product.originalPrice);
      setDiscountedPrice(data.product.discountedPrice);
      setDiscount(data.product.discount);
      setRating(data.product.rating);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error("Failed to load product details");
    }
  };

  const handleUpdate = async (e) => {
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
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const response = await fetch(`http://localhost:7000/api/v1/product/update-product/${id}`, {
        method: "PUT",
        headers: {
          Authorization: AuthorizationToken,
        },
        body: productData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Product Updated Successfully");
        navigate("/admin/product");
      } else {
        toast.error(data?.message || "Failed to update product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;
      
      const response = await fetch(`http://localhost:7000/api/v1/product/delete-product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Product deleted Successfully");
        navigate("/admin/product");
      } else {
        toast.error(data?.message || "Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Body>
          <h1 className="text-center mb-4">
            <PencilSquare className="me-2" />
            Update Product
          </h1>
          <Form onSubmit={handleUpdate}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
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
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    rows={3}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <CurrencyDollar /> Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Original Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="Enter original price"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <div className="d-flex flex-column align-items-center">
                    <Image
                      src={photo ? URL.createObjectURL(photo) : `http://localhost:7000/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                      thumbnail
                    />
                    <Form.Control
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      className="mt-2"
                    />
                  </div>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Discounted Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={discountedPrice}
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                        placeholder="Enter discounted price"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Discount %</Form.Label>
                      <Form.Control
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="Enter discount percentage"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Star /> Rating
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Enter rating"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <BoxSeam /> Quantity
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Shipping</Form.Label>
                  <Form.Select
                    value={shipping ? "1" : "0"}
                    onChange={(e) => setShipping(e.target.value)}
                    required
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="primary" type="submit" className="px-4">
                <PencilSquare className="me-2" />
                Update Product
              </Button>
              <Button variant="danger" onClick={handleDelete} className="px-4">
                <TrashFill className="me-2" />
                Delete Product
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateProduct;