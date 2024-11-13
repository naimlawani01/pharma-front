import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Load initial state from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // Check if the item is already in the cart
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem) {
      // If it exists, increase the quantity
      setCartItems(cartItems.map(item => 
        item._id === product._id ? { ...existingItem, quantity: existingItem.quantity + 1 } : item
      ));
    } else {
      // Otherwise, add new item with quantity set to 1
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => 
      prevItems.filter(item => item._id !== productId) // Only remove the item with the matching ID
    );
  };

  const updateCartItem = (productId, quantity) => {
    setCartItems((prevItems) => 
      prevItems.map(item => 
        item._id === productId ? { ...item, quantity: Math.max(quantity, 1) } : item // Ensure quantity is at least 1
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
