import React from 'react';
import {  Link } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import {  XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from '../../../utils/logo';

const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen, user, handleLogout, totalItemsInCart }) => (
    <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Logo />
          <button onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-6 space-y-6">
          <Link to="/all-products" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            Produits
          </Link>
          <Link to="/cart" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            Mon Panier
            {totalItemsInCart > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 text-xs ml-2">
                {totalItemsInCart}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link to="/orders" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                Mes Commandes
              </Link>
              <button onClick={handleLogout} className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Login
            </Link>
          )}
        </div>
      </DialogPanel>
    </Dialog>
);


export default MobileMenu;