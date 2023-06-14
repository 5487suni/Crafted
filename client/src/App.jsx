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
  ShopCreate
} from "./Routes.js"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from './redux/store'
import { loadUser } from './redux/actions/user'
import { useSelector } from 'react-redux';
const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(loadUser())
    console.log(isAuthenticated)
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
        <Route path='/login' element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/shop-create"element={<ShopCreate/>}/>
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
