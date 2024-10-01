import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/20/solid'; 
import { useAuth } from '../hooks/useAuth';
import { Logo } from '../utils/logo';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className='shadow-sm'>
      {/* Première petite barre verte */}
      <div className="bg-green-900 h-8 flex items-center justify-center">
        <p className="text-white text-xs"></p>
      </div>

      {/* TopBar principale */}
      <nav aria-label="Global" className="bg-white mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-3 py-2 text-sm w-full max-w-xs"
          />
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/products"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Nos produits
          </Link>
          {user ? (
            <>
              <Link
                to="/orders"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Mes Commandes
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Login <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
        {user && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <UserIcon
              onClick={() => navigate('/profile')}
              className="h-6 w-6 cursor-pointer text-gray-900"
            />
          </div>
        )}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/products"
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Produits
                </Link>
                {user && (
                  <Link
                    to="/orders"
                    className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Mes Commandes
                  </Link>
                )}
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
