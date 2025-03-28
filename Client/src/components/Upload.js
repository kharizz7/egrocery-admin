import { useState } from "react";
import axios from "axios";

export default function Upload({ category = "Product", apiUrl }) {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: "",
    offer: "",
    availability: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiUrl, { ...product, category });
      alert(`${category} product added successfully!`);
      setProduct({
        name: "",
        brand: "",
        price: "",
        quantity: "",
        offer: "",
        availability: "",
      });
    } catch (err) {
      alert(`Error adding ${category} product: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        {category.toUpperCase()} Upload
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
          type="number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          type="number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="offer"
          value={product.offer}
          onChange={handleChange}
          placeholder="Offer (Optional)"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          name="availability"
          value={product.availability}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Availability</option>
          <option value="Yes">Available</option>
          <option value="No">Not Available</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add {category}
        </button>
      </form>
    </div>
  );
}
