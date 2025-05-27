import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Table, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubCategories, addSubCategory, updateSubCategory, deleteSubCategory } from '../services/allApis';
import { FaEdit, FaTrash } from 'react-icons/fa';


const Subcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', subcategory_image: null });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();
  const { categoryId, categoryName } = useParams();
console.log(categoryId)
  const header = {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc5ODgxODY1LCJpYXQiOjE3NDgzNDU4NjUsImp0aSI6ImYxNWYwMzk0MjVhMDQ3MDJhYjMwMzU1NTQxOGY3YTY1IiwidXNlcl9pZCI6MX0.4kj3P4f155L7I1EA4sVfaz6vi6vQV3uVJ_rAVFG1AYU`
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    const res = await getSubCategories(header);
    console.log(res)
   if (res?.status === 200) {
    const filteredSubcats = res.data.filter(
      (subcat) => String(subcat.category) === String(categoryId)
    );
    setSubcategories(filteredSubcats);
  }
  };

  const resetForm = () => {
    setForm({ id: null, name: '', subcategory_image: null });
    setShowModal(false);
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'subcategory_image') {
      setForm({ ...form, subcategory_image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || (!form.subcategory_image && !isEditMode)) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    if (form.subcategory_image) {
      formData.append('sub_category_image', form.subcategory_image);
    }
    formData.append('category', categoryId);
    formData.append('is_active',true)

    let res;
    if (isEditMode) {
      res = await updateSubCategory(form.id, formData, header);
    } else {
      res = await addSubCategory( header,formData);
      console.log(res)
      fetchSubcategories()
    }

    if (res?.status === 200 || res?.status === 201) {
      fetchSubcategories();
      resetForm();
    } else {
      alert('Failed to save subcategory');
    }
  };

  const handleEdit = (subcat) => {
    setForm({ id: subcat.id, name: subcat.name, subcategory_image: null });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      const res = await deleteSubCategory(id, header);
      if (res?.status === 200 || res?.status === 204) {
        fetchSubcategories();
      } else {
        alert('Failed to delete subcategory');
      }
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Subcategories for "{decodeURIComponent(categoryName)}"</h2>
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Add Subcategory
        </Button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No subcategories added yet.</td>
              </tr>
            ) : (
              subcategories.map(subcat => (
                <tr key={subcat.id}>
                  <td>{subcat.id}</td>
                  <td>{subcat.name}</td>
                  <td>{subcat.category_id}</td>
                  <td>
                    <img
                      src={subcat.sub_category_image}
                      alt={subcat.name}
                      style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                  </td>
                  <td>
                                       <Button variant="btn" style={{padding:10,color:"orange"}} size="md"className="me-2" onClick={() => handleEdit(subcat)}>
 <FaEdit/>                    </Button>
                    <Button variant="btn" style={{padding:10,color:"red"}} size="md"onClick={() => handleDelete(subcat.id)}>
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
          <Modal.Title>{isEditMode ? 'Edit Subcategory' : 'Add New Subcategory'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subcategory Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter subcategory name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Subcategory Image {isEditMode && '(Leave blank to keep current image)'}
              </Form.Label>
              <Form.Control
                type="file"
                name="subcategory_image"
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

export default Subcategories;
