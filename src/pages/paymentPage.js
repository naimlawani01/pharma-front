import React, { useState } from 'react';
import Navbar from '../components/navbar';
import api from '../utils/axiosInstance';
import { useCart } from '../context/cartContext';

const PaymentPage = () => {
  const [address, setAddress] = useState('');
  const [prescriptionFiles, setPrescriptionFiles] = useState({});
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Utilisation du contexte cartContext pour récupérer cartItems
  const { cartItems } = useCart();

  // Fonction pour gérer la soumission de la commande
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que tous les produits nécessitant une ordonnance ont bien un fichier
    for (const item of cartItems) {
      if (item.prescription && !prescriptionFiles[item.product_id]) {
        alert(`Veuillez télécharger l'ordonnance pour le produit ${item.name}.`);
        return;
      }
    }
    console.log(cartItems)
    const products = cartItems.map((item) => ({
      product_id: item._id,
      quantity: item.quantity,
    }));

    const orderData = {
      products,
      billing_address: "string", 
      shipping_address: shippingAddress,
    };
    console.log(orderData)
    try {
      // Soumettre la commande
       await api.post('/orders', orderData, {
      });

      
    } catch (error) {
      console.error('Erreur lors de la validation de la commande:', error);
      alert('Une erreur est survenue lors de la validation de la commande. Veuillez réessayer.');
    }
  };

  // Fonction pour gérer le téléchargement des ordonnances
  const handlePrescriptionFileChange = (productId, file) => {
    setPrescriptionFiles((prevFiles) => ({
      ...prevFiles,
      [productId]: file,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Informations de Livraison</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Adresse de livraison</label>
            <input
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Entrez l'adresse de livraison"
              required
            />
          </div>

          {/* Ordonnance pour les produits nécessitant une ordonnance */}
          {cartItems && cartItems.length > 0 && cartItems.map((item) => (
            <div key={item.product_id}>
              {item.prescription && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Ordonnance pour {item.name} (obligatoire)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handlePrescriptionFileChange(item.product_id, e.target.files[0])}
                    className="w-full"
                    required
                  />
                </div>
              )}
            </div>
          ))}

          {/* Sélection du moyen de paiement */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Choisissez votre moyen de paiement</label>
            <div className="flex space-x-4">
              <div>
                <input
                  type="radio"
                  id="orangeMoney"
                  name="paymentMethod"
                  value="orangeMoney"
                  onChange={() => setPaymentMethod('Orange Money')}
                  className="mr-2"
                />
                <label htmlFor="orangeMoney" className="cursor-pointer">
                  <img src="https://seeklogo.com/images/O/orange-money-logo-8F2AED308D-seeklogo.com.png" alt="Orange Money" className="inline-block" />
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="mobileMoney"
                  name="paymentMethod"
                  value="mobileMoney"
                  onChange={() => setPaymentMethod('Mobile Money')}
                  className="mr-2"
                />
                <label htmlFor="mobileMoney" className="cursor-pointer">
                  <img src="https://seeklogo.com/images/M/mtn-mobile-money-logo-AD1D8B5CE4-seeklogo.com.png" alt="Mobile Money" className="inline-block" />
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
          >
            Confirmer la commande
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentPage;
