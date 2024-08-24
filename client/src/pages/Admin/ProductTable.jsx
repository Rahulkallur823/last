import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getallproducts = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/product/get-products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch products.');
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallproducts();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="mb-4">Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {products.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>

                <th scope="col">Status</th>
                <th scope="col">Rating</th>
                <th scope="col">Price</th>

                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={`http://localhost:7000/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      style={{ objectFit: 'cover', height: '100px', width: '100px' }}
                      className="img-thumbnail"
                    />
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>{p.name}</td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>{p.category.name}</td>

                  <td className={p.quantity > 0 ? 'text-success' : 'text-danger'}>
                    {p.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`text-${i < p.rating ? 'warning' : 'secondary'} me-1`}
                          style={{ width: '16px', height: '16px' }}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="text-muted text-decoration-line-through me-2">Rs {p.originalPrice}</span>
                    <span className="text-danger fw-bold">Rs {p.discountedPrice}</span>
                  </td>
                  <td>
                    <Link to={`admin/product/${p.slug}`} className="btn btn-primary btn-sm">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductTable;
