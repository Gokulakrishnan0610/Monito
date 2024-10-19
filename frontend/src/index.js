import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Context from './service/ServiceProvider';
import Category from "./Category"
import Contact from "./Contact"
import Admin from "./Admin"
import AdminDetails from './components/admin/AdminDetails';
import UserDetails from './components/admin/UserDetails'
import Products from './components/admin/Products';
import AddProducts from "./components/admin/AddProducts"
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ResetPass from './components/auth/ResetPass';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/resetpassword" element={<ResetPass/>} />
        <Route path="/category" element={<Category />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/AdminDetails" element={<AdminDetails />} />
        <Route path="/UserDetails" element={<UserDetails />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/AddProducts" element={<AddProducts />} />
      </Routes>
    </BrowserRouter>
  </Context>
);