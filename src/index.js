import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Context from './service/ServiceProvider';
import Category from "./Category"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/category" element={<Category/>}/>
      </Routes>
    </BrowserRouter>
  </Context>
);

