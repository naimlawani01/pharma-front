import React from 'react';
import { useCart } from '../context/cartContext';
import Navbar from '../components/navbar'; // Import de la Navbar
import { XMarkIcon } from '@heroicons/react/24/outline'; // Icône pour supprimer

const CartPage = () => {
  const { cartItems } = useCart();

  const totalAmount = cartItems.reduce((acc, item) => {
  const price = Number(item.price) || 0; // Convertir en nombre ou utiliser 0 si indéfini
  const quantity = Number(item.quantity) || 1; // Convertir en nombre ou utiliser 0 si indéfini
  return acc + price * quantity;
}, 0);


  return (
    <div>
      {/* Navbar */}
      <Navbar /> 

      {/* Contenu de la page du panier */}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Mon Panier</h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <li key={index} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={item.name}
                      src={item.img || 'https://via.placeholder.com/150'}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">{item.price  || '€XX'}€</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Quantité {item.quantity || 1}</p>
                      <div className="flex">
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Aucun produit dans le panier.</p>
            )}
          </ul>
        </div>

        {/* Section Total et Boutons */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 mt-6 pt-4">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Prix Total</p>
              <p>{totalAmount}€</p> {/* Remplace par le total réel */}
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Valider la commande
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                ou{' '}
                <a href="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continuer vos achats
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
