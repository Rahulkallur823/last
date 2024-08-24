import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/Auth';
import { toast } from 'react-toastify';
import { Modal, Button, Form, Table, Card, Container, Row, Col } from 'react-bootstrap';
import { Edit, Delete, Add, Refresh } from '@mui/icons-material';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const { AuthorizationToken } = useAuth();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7000/api/v1/category/create-category', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify({ name })
      });

      const resdata = await response.json();

      if (response.ok) {
        toast.success(`${name} category created successfully`);
        getAllCategories();
        setName('');
      } else {
        toast.error(resdata.message || "Failed to create category");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the category");
    }
  };

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
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch categories.');
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:7000/api/v1/category/update-category/${selected._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify({ name: updateName })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`${updateName} is updated`);
        setSelected(null);
        setUpdateName("");
        setShowModal(false);
        getAllCategories();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/api/v1/category/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken,
        },
      });
  
      const data = await response.json();
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategories();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4 text-primary">Category Management</h1>
              <Form onSubmit={handleSubmit} className="mb-4">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 py-2" size="lg">
                  <Add className="me-2" />
                  Add Category
                </Button>
              </Form>
              {error && <p className="text-danger">{error}</p>}
              {categories.length > 0 ? (
                <Table striped bordered hover responsive className="mt-4">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => {
                              setShowModal(true);
                              setUpdateName(category.name);
                              setSelected(category);
                            }}
                          >
                            <Edit />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(category._id)}
                          >
                            <Delete />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center mt-4">No categories found</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter new category name"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                required
                className="form-control-lg"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 py-2" size="lg">
              <Refresh className="me-2" />
              Update Category
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default CreateCategory;  