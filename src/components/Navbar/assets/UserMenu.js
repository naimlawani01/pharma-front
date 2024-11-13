import React from 'react';
import {  Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/20/solid';

const UserMenu = ({ user, handleLogout, totalItemsInCart, navigate }) => (
  <div className={`hidden lg:flex lg:gap-x-6 lg:items-center ${user ? 'ml-6' : ''}`}>
    <Link to="/all-products" className="text-sm font-semibold leading-6 text-gray-900">
      Nos produits
    </Link>

    <Link to="/cart" className="flex items-center space-x-2">
      <ShoppingCartIcon className="h-6 w-6 text-gray-900" />
      <span className="text-sm font-semibold leading-6 text-gray-900">Mon Panier</span>
      {totalItemsInCart > 0 && (
        <span className="bg-red-500 text-white rounded-full px-2 text-xs">
          {totalItemsInCart}
        </span>
      )}
    </Link>

    {user ? (
      <>
        <Link to="/orders" className="text-sm font-semibold leading-6 text-gray-900">
          Mes Commandes
        </Link>
        <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
          Logout
        </button>
        <UserIcon
          onClick={() => navigate('/profile')}
          className="h-6 w-6 cursor-pointer text-gray-900"
        />
      </>
    ) : (
      <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
        Login <span aria-hidden="true">&rarr;</span>
      </Link>
    )}
  </div>
);

export default UserMenu;