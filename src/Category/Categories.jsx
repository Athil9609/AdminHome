import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addCategories, getCategories, updateCategory, deleteCategory } from '../services/allApis';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', category_image: null });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const header = {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc5ODgxODY1LCJpYXQiOjE3NDgzNDU4NjUsImp0aSI6ImYxNWYwMzk0MjVhMDQ3MDJhYjMwMzU1NTQxOGY3YTY1IiwidXNlcl9pZCI6MX0.4kj3P4f155L7I1EA4sVfaz6vi6vQV3uVJ_rAVFG1AYU`
    };
    const res = await getCategories(header);
    if (res?.status === 200) {
      setCategories(res.data);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'category_image') {
      setForm({ ...form, category_image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || (!form.category_image && !isEditMode)) {
      alert('Please fill all fields');
      return;
    }

    const header = {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc5ODgxODY1LCJpYXQiOjE3NDgzNDU4NjUsImp0aSI6ImYxNWYwMzk0MjVhMDQ3MDJhYjMwMzU1NTQxOGY3YTY1IiwidXNlcl9pZCI6MX0.4kj3P4f155L7I1EA4sVfaz6vi6vQV3uVJ_rAVFG1AYU`
    };

    const formData = new FormData();
    formData.append('name', form.name);
    if (form.category_image) {
      formData.append('category_image', form.category_image);
    }
    formData.append('store_type', 2);

    let res;
    if (isEditMode) {
      res = await updateCategory(form.id, formData, header);
    } else {
      res = await addCategories(formData, header);
    }

    if (res?.status === 201 || res?.status === 200) {
      getData();
      setForm({ id: null, name: '', category_image: null });
      setShowModal(false);
      setIsEditMode(false);
    } else {
      alert('Failed to save category');
    }
  };

  const handleEdit = (cat) => {
    setForm({ id: cat.id, name: cat.name, category_image: null });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const header = {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc5ODgxODY1LCJpYXQiOjE3NDgzNDU4NjUsImp0aSI6ImYxNWYwMzk0MjVhMDQ3MDJhYjMwMzU1NTQxOGY3YTY1IiwidXNlcl9pZCI6MX0.4kj3P4f155L7I1EA4sVfaz6vi6vQV3uVJ_rAVFG1AYU`
      };
      const res = await deleteCategory(id, header);
      getData();
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center  mb-3">
        <h2 className='mt-4'>Categories</h2>
        <Button variant="primary" onClick={() => {
          setForm({ id: null, name: '', category_image: null });
          setIsEditMode(false);
          setShowModal(true);
        }}>
          + Add Category
        </Button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Store Type ID</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No categories added yet.</td>
              </tr>
            ) : (
              categories.map(cat => (
                <tr  title={`Go to Subcategories of ${cat.name}`} key={cat.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/subcategories/${cat.id}/${encodeURIComponent(cat.name)}`)}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{cat.store_type}</td>
                  <td>
                    <img
                      src={cat.category_image}
                      alt={cat.name}
                      style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <Button variant="btn" style={{padding:10,color:"orange"}} size="md" className="me-2" onClick={() => handleEdit(cat)}>
                      <FaEdit/>
                    </Button>
                    <Button variant="btn" style={{padding:10,color:"red"}} size="md" onClick={() => handleDelete(cat.id)}>
                      <FaTrash/>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Category' : 'Add New Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter category name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category Image {isEditMode && '(Leave blank to keep current image)'}</Form.Label>
              <Form.Control
                type="file"
                name="category_image"
                onChange={handleChange}
                accept="image/*"
                required={!isEditMode}
              />
            </Form.Group>
            <div className="mt-3 d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {isEditMode ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Categories;
