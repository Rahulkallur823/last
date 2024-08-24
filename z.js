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