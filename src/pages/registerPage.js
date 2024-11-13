import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../utils/axiosInstance';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const newUser = {
            username,
            last_name,
            first_name,
            email,
            password,
            role: "customer" // Rôle par défaut
          };
    
    try {
       await api.post('/users/customer', newUser);
      navigate('/login'); // Redirige après l'inscription
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Colonne gauche : formulaire d'inscription */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Créez votre compte
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                {/* Champ Prénom */}
                <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                Prénom
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Champ Nom de famille */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                Nom de famille
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>
            {/* Champ Nom d'utilisateur */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                Nom d'utilisateur
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Champ Mot de Passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>



            {/* Bouton d'inscription */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {loading ? 'Inscription en cours...' : 'S\'inscrire'}
              </button>
            </div>
          </form>

          {/* Lien de connexion */}
          <div className="mt-4">
            <p>
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Colonne droite : image */}
      <div className="hidden lg:block flex-1">
        <img
          src="https://images.unsplash.com/photo-1622230208995-0f26eba75875?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Remplacez par l'URL de votre image
          alt="Signup illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignupPage;
