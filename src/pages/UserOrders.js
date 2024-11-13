// pages/UserOrders.js
import React from 'react';
import Navbar from '../components/navbar';
import { useFetchOrders } from '../hooks/useFetchOrders';

const UserOrders = () => {
  const { orders, isLoading, error } = useFetchOrders();

  if (isLoading) return <p>Chargement des commandes...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Mes Commandes</h1>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-gray-100 p-4 my-4 rounded">
              <h2>Commande #{order._id}</h2>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Total: €{order.totalPrice}</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} - {item.quantity} x €{item.price}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Aucune commande trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
