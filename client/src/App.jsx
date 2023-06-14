import React, { useEffect } from 'react'
import ProtectedRoute from './protectedroute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  Login,
  Home, 
  ActivationPage, 
  ProductsPage, 
  BestSellingPage, 
  EventsPage, 
  FAQPage, 
  ProductDetailsPage,
  ProfilePage,
  ShopCreate,
  SellerActivationPage,
  ShopLogin,
} from "./Routes.js"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from './redux/store'
import { loadUser } from './redux/actions/user'
import { loadSeller } from './redux/actions/user';
import { useSelector } from 'react-redux';
const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const {isSeller,seller} =useSelector((state)=>state.seller)
  useEffect(() => {
    Store.dispatch(loadUser())
    Store.dispatch(loadSeller())
    console.log(isAuthenticated)
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
        <Route path="/seller/activation/:activation_token" element={<SellerActivationPage />} />
        <Route path='/login' element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/shop-create"element={<ShopCreate/>}/>
        <Route path="/shop-login"element={<ShopLogin/>}/>
        <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProfilePage /></ProtectedRoute>} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  )
}

export default App
