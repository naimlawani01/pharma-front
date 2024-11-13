import React from 'react';
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/publicsRoutes';
import {CartProvider} from './context/cartContext'
import './App.css';

function App() {
  return (    
    <CartProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </CartProvider>
      
 
  );
}

export default App;
