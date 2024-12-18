import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProductById } from '../hooks/useFecthProducts';
import Navbar from '../components/navbar';
import ProductDetailSkeleton from '../components/Skeleton/ProductDetailSkeleton'; // Import du squelette

const ProductDetailPage = () => {
  const { productId } = useParams(); 
  const { product, error, isLoading } = useFetchProductById(productId);  

  return (
    <div>
      <Navbar />
      
      {isLoading || error ? (
        <ProductDetailSkeleton />  // Utilisation du composant squelette
      ) : (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-sm rounded-lg">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          
          <img 
            src={product.img || 'https://media.istockphoto.com/id/1199617301/fr/photo/bo%C3%AEte-de-m%C3%A9dicaments-contre-la-douleur-et-la-fi%C3%A8vre-du-parac%C3%A9tamol.jpg?s=612x612&w=0&k=20&c=mQJ-zzLqvaAJHMAbJdsiTkk88aHgPnX0D7GKfEzp4kc='} 
            alt={product.name} 
            className="mt-4" 
          />
          
          <p className="text-gray-700 mb-4 mt-6">{product.description}</p>
          <p className="text-lg  mb-2"><span className='font-semibold'>Prix :</span>  {product.price} GNF</p> 
          {/* <p className="text-gray-500">Disponible à la pharmacie : {product.pharmacy.name}</p> */}
        </div>
      )}
      
    </div>
  );
};

export default ProductDetailPage;
