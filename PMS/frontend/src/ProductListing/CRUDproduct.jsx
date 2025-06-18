import { useEffect, useState } from 'react';
import axios from 'axios';
import './product.css'
const API_URL = 'http://localhost:3000/api/products';

const ProductCRUD = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error('Fetch Error:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      if (editId) {
        await axios.put(`${API_URL}/${editId}`, productData);
      } else {
        await axios.post(`${API_URL}`, productData);
      }

      setFormData({ name: '', price: '', description: '' });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error('Submit Error:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description
    });
    setEditId(product._id);
  };

  return (
    <>
    <h1>Admin Interface</h1>
     <div className="product-container">
      <h2>{editId ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          required
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          required
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setFormData({ name: '', price: '', description: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>
  <div className="product-card">
      <h3>Product List</h3>
      {products.map((product) => (
        <div
          key={product._id}
          style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
        >
          <p>
            <strong>{product.name}</strong> - ₹{product.price}
          </p>
          <p>{product.description}</p>
          <button onClick={() => handleEdit(product)}>Edit</button>
          <button
            onClick={() => handleDelete(product._id)}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
    </div>
    </>
  );
};

export default ProductCRUD;
