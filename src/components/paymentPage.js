import React from 'react';

const PaymentModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Sélectionnez le moyen de paiement</h2>

        {/* Options de paiement */}
        <div className="flex justify-around">
          <label className="flex flex-col items-center cursor-pointer">
            <img
              src="https://seeklogo.com/images/O/orange-money-logo-8F2AED308D-seeklogo.com.png" // Remplacez par le lien réel de l'image Orange Money
              alt="Orange Money"
              className="w-20 h-20 mb-2" // Taille augmentée pour les images
            />
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="paymentMethod"
                value="Orange Money"
                className="mr-2"
              />
              <span className="text-gray-700">Orange Money</span>
            </div>
          </label>

          <label className="flex flex-col items-center cursor-pointer">
            <img
              src="https://seeklogo.com/images/M/mtn-mobile-money-logo-AD1D8B5CE4-seeklogo.com.png" // Remplacez par le lien réel de l'image Mobile Money
              alt="Mobile Money"
              className="w-20 h-20 mb-2" // Taille augmentée pour les images
            />
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="paymentMethod"
                value="Mobile Money"
                className="mr-2"
              />
              <span className="text-gray-700">Mobile Money</span>
            </div>
          </label>
        </div>

        {/* Boutons de confirmation et d'annulation */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Confirmer le paiement
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
