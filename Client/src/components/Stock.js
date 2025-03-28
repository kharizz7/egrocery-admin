import React, { useEffect, useState } from "react";
import axios from "axios";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // To track which product is being edited
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: "",
    offer: "",
    availability: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products/");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product._id);
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price,
      quantity: product.quantity,
      offer: product.offer,
      availability: product.availability,
    });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/products/${id}`, formData);
      alert("Product updated successfully!");
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Stock Details</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">S.No</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Brand</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Offer</th>
            <th className="border border-gray-300 p-2">Availability</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td className="border border-gray-300 p-2 text-center">{index + 1}</td>

              {editProduct === product._id ? (
                <>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      name="offer"
                      value={formData.offer}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                    <button
                      className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                      onClick={() => handleUpdate(product._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 px-3 py-1 rounded text-white hover:bg-gray-500"
                      onClick={() => setEditProduct(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 p-2">{product.name}</td>
                  <td className="border border-gray-300 p-2">{product.brand}</td>
                  <td className="border border-gray-300 p-2">{product.price}</td>
                  <td className="border border-gray-300 p-2">{product.quantity}</td>
                  <td className="border border-gray-300 p-2">{product.offer}</td>
                  <td className="border border-gray-300 p-2">{product.availability}</td>
                  <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                    <button
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                      onClick={() => handleEditClick(product)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
