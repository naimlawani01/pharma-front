import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import api from '../utils/axiosInstance';
import { useCart } from '../context/cartContext';

const PaymentPage = () => {
  const [address, setAddress] = useState('');
  const [prescriptionFiles, setPrescriptionFiles] = useState({});
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(''); // Message de confirmation
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart(); // Ajout de clearCart pour vider le panier

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des ordonnances
    for (const item of cartItems) {
      if (item.prescription && !prescriptionFiles[item.product_id]) {
        alert(`Veuillez télécharger l'ordonnance pour le produit ${item.name}.`);
        return;
      }
    }

    const products = cartItems.map((item) => ({
      product_id: item._id,
      quantity: item.quantity,
    }));

    const orderData = {
      products,
      billing_address: billingAddress,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
    };

    try {
      await api.post('/orders', orderData);
      
      // Affichage du message de confirmation
      setConfirmationMessage('Commande validée avec succès !');
      
      // Vider le panier
      clearCart();

      // Redirection après 3 secondes
      setTimeout(() => {
        setConfirmationMessage('');
        navigate('/orders'); // Redirection vers la page des commandes
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la validation de la commande:', error);
      
    }
  };

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
        {confirmationMessage && (
          <div className="p-4 mb-6 bg-green-100 text-green-800 rounded-md">
            {confirmationMessage}
          </div>
        )}
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
                  <img src="https://seeklogo.com/images/O/orange-money-logo-8F2AED308D-seeklogo.com.png" alt="Orange Money" className="inline-block w-8 h-8" />
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
                  <img src="https://seeklogo.com/images/M/mtn-mobile-money-logo-AD1D8B5CE4-seeklogo.com.png" alt="Mobile Money" className="inline-block w-8 h-8" />
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
