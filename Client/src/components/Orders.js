import { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Mocking the API call with local JSON data
        const data = [
          {
            "id": "ORD12345",
            "customerName": "John Doe",
            "totalAmount": 45.99,
            "status": "Pending"
          },
          {
            "id": "ORD12346",
            "customerName": "Jane Smith",
            "totalAmount": 89.50,
            "status": "Shipped"
          },
          {
            "id": "ORD12347",
            "customerName": "Alice Johnson",
            "totalAmount": 32.75,
            "status": "Delivered"
          },
          {
            "id": "ORD12348",
            "customerName": "Bob Brown",
            "totalAmount": 120.00,
            "status": "Cancelled"
          },
          {
            "id": "ORD12349",
            "customerName": "Emma Wilson",
            "totalAmount": 58.30,
            "status": "Processing"
          }
        ];
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders from eGroceryMart</h2>
      {orders.length === 0 ? (
        <p>Loading orders...</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="p-4 border rounded-lg">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Total:</strong> ${order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
