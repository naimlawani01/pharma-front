import React from 'react';
import { Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/homePage';


const AppRoutes = ()=> {
    return (
  
      <Routes>
        {/* Route publique pour la page de login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
       


        </Routes>

);
}

export default AppRoutes;
