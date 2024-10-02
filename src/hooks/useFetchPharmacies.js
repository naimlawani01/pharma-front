import { useState, useEffect } from 'react';
import getPharmacies from '../services/getPharmacies';

export const useFetchPharmacies = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPharmacies()
            .then((data) => {
                setPharmacies(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    return { pharmacies, isLoading, error };
};