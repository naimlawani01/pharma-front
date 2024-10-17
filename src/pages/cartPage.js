// Cart.js
import React from 'react';
import { useCart } from '../context/cartContext';
import Navbar from '../components/navbar'; // Import de la Navbar

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div>
      {/* Navbar */}
      <Navbar /> 

      {/* Contenu de la page du panier */}
      <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md mt-4">
        <h1 className="text-2xl font-bold mb-4">Mon Panier</h1>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="mb-4">
              <h2 className="font-semibold">{item.name}</h2>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>Aucun produit dans le panier.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
