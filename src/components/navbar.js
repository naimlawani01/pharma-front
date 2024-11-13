import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileMenu from './Navbar/assets/MobileMenu';
import SearchBar from './Navbar/assets/SearchBar';
import UserMenu from './Navbar/assets/UserMenu';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { useSearchProducts } from '../hooks/useSearchProducts';
import { useCart } from '../context/cartContext';
import { Logo } from '../utils/logo';




const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { query, setQuery, suggestions, isLoading } = useSearchProducts();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  // Calculer le total des articles dans le panier
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <header className="shadow-sm">
      <div className="bg-green-900 h-8 flex items-center justify-center">
        <p className="text-white text-xs">Livraison gratuite dès 50€ d'achat !</p>
      </div>

      <nav className="bg-white mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Logo />
        </div>

        {/* Composant SearchBar */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          isLoading={isLoading}
          navigate={navigate}
        />

        {/* Composant UserMenu */}
        <UserMenu
          user={user}
          handleLogout={handleLogout}
          totalItemsInCart={totalItemsInCart}
          navigate={navigate}
        />

        {/* Menu Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center p-2.5 text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Composant MobileMenu */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        handleLogout={handleLogout}
        totalItemsInCart={totalItemsInCart}
      />
    </header>
  );
};

export default Navbar;
