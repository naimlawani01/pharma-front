import React from 'react';
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/publicsRoutes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
        <AppRoutes />
      </div>
    </Router>
    </AuthProvider>
      
 
  );
}

export default App;
