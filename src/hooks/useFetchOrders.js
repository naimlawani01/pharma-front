// hooks/useFetchOrders.js
import { useState, useEffect } from 'react';
import { fetchUserOrders } from '../services/ordersService';

export const useFetchOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchUserOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getOrders();
  }, []);

  return { orders, isLoading, error };
};
