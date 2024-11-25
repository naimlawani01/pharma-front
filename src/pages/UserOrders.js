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
              <h2 className="text-xl font-semibold">Commande #{order._id}</h2>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              <p>Adresse de facturation : {order.billing_address}</p>
              <p>Adresse de livraison : {order.shipping_address}</p>
              
              <ul className="mt-4">
                {order.order_lines.map((line) => (
                  <li key={line.id} className="mb-2">
                    <div className="flex items-center">
                      <img
                        src={line.product_id.img}
                        alt={line.product_id.name}
                        className="w-16 h-16 mr-4"
                      />
                      <div>
                        <p className="font-medium">{line.product_id.name}</p>
                        <p className="text-gray-600">
                          {line.quantity} x {line.product_id.price} GNF
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="font-bold mt-4">
                Total: 
                {order.order_lines.reduce(
                  (total, line) => total + line.quantity * line.product_id.price,
                  0
                )} GNF
              </p>
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
