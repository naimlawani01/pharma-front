import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProductById } from '../hooks/useFecthProducts';
import Navbar from '../components/navbar';

const ProductDetailPage = () => {
  const { productId } = useParams(); 
  const { product, error, isLoading } = useFetchProductById(productId);  

 

  

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <img src={product.img || 'https://media.istockphoto.com/id/1199617301/fr/photo/bo%C3%AEte-de-m%C3%A9dicaments-contre-la-douleur-et-la-fi%C3%A8vre-du-parac%C3%A9tamol.jpg?s=612x612&w=0&k=20&c=mQJ-zzLqvaAJHMAbJdsiTkk88aHgPnX0D7GKfEzp4kc='} 
        alt={product.name} className="mt-4" />

        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-semibold mb-4">Prix : {"product.price"} €</p>
        {/* <p className="text-gray-500">Disponible à la pharmacie : {product.pharmacy.name}</p> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
