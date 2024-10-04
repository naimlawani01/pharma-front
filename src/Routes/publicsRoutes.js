import React from 'react';
import { Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/homePage';
import ProductsInPharmacie from '../pages/productInPharmaciePage';
import AllProducts from '../pages/allProductsPage';
import ProductDetailPage from '../pages/productDetailPage';


const AppRoutes = ()=> {
    return (
  
      <Routes>
        {/* Route publique pour la page de login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path = "/list-product/:id" element ={<ProductsInPharmacie />} />
        <Route path = "/all-products" element={<AllProducts/>} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>

);
}

export default AppRoutes;
