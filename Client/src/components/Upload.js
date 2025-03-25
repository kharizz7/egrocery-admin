import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [product, setProduct] = useState({ name: "", category: "", quantity: "", price: "" });
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Retrieve token from local storage
  const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
  const token = persistRoot ? JSON.parse(persistRoot.user).token : null;

  useEffect(() => {
    if (!token) {
      alert("Unauthorized: No token found. Please log in.");
    }
  }, [token]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Fetch Stocks from Backend
  const fetchStocks = async () => {
    if (!token) {
      alert("Unauthorized: No token found. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/stocks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error.response || error);
      alert("Failed to fetch stocks: " + (error.response?.data?.message || error.message));
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.category || !product.quantity || !product.price) {
      return alert("All fields are required");
    }

    if (!token) {
      alert("Unauthorized: No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/stocks", product, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Stock added successfully!");
      setStocks([...stocks, response.data.stock]);
      setProduct({ name: "", category: "", quantity: "", price: "" });
    } catch (error) {
      console.error("Error adding stock:", error.response || error);
      alert(`Failed to add stock: ${error.response?.data?.message || error.message}`);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
      }
    }
  };

  return (
    <div id="upload" className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">E-Grocery Mart Admin Panel</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="p-2 border rounded-lg"
        />
        <input
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="p-2 border rounded-lg"
        />
        <input
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          className="p-2 border rounded-lg"
        />
        <input
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="p-2 border rounded-lg"
        />
        <button type="submit" className="col-span-1 md:col-span-4 bg-blue-500 text-white p-2 rounded-lg">
          {loading ? "Loading..." : "Add Stock"}
        </button>
      </form>

      {loading ? (
        <p>Loading stocks...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
