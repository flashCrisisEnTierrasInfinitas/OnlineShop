//! app de la pagina web
//* creador: jhon mario(WHOAOMI)
//? fecha creacion: 2023
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import FooterMenu from "./components/footer-menu";
import Header from "./components/header";
import Home from "./content/pages/home/Home";
import Pay from "./content/pages/store/ pay";
import Login from "./Auth/login";
import ProductoCate from "./content/pages/store/producCate";
import Profile from "./content/pages/dastboard/profile";
import Historial from "./content/pages/dastboard/historial";
import Footer from "./components/Footer";
import Notificaciones from "./content/pages/dastboard/notificaciones";
import MiLista from "./content/pages/dastboard/miLista";
import DahsboardAdmin from "./content/admin/dahsboard";
import User from "./content/admin/user";
import Product from "./content/admin/product";
import Category from "./content/admin/category";

function App() {
  axios.defaults.baseURL ="https://apionlineshop.com.asuprocolombiasas.com/api";
  //axios.defaults.baseURL ="http://localhost:8000/api";
  const [allProducts, setAllproducts] = useState(() => {
    const saveEquipos = window.localStorage.getItem("allProducts");
    if (saveEquipos) {
      return JSON.parse(saveEquipos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }, [allProducts]);

  const [total, setTotal] = useState(() => {
    const total = window.localStorage.getItem("total");
    if (total) {
      return JSON.parse(total);
    } else {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("total", JSON.stringify(total));
  }, [total]);

  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    window.localStorage.setItem("countProducts", JSON.stringify(countProducts));
  }, [countProducts]);

  return (
    <>
      <div className="App">
        <Router>
          <header className="App-header">
            <Header
              allProducts={allProducts}
              setAllproducts={setAllproducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
            />
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  allProducts={allProducts}
                  setAllproducts={setAllproducts}
                  total={total}
                  setTotal={setTotal}
                  countProducts={countProducts}
                  setCountProducts={setCountProducts}
                />
              }
            />
            <Route
              path="/pay"
              element={
                <Pay
                  total={total}
                  setAllproducts={setAllproducts}
                  setTotal={setTotal}
                  setCountProducts={setCountProducts}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/ProductosCat" element={<ProductoCate />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
            <Route path="/Historial" element={<Historial />} />
            <Route path="/MiLista" element={<MiLista />} />
            {/* TODO:routes the admin */}
            <Route path="/dahsboard" element={<DahsboardAdmin />} />
            <Route path="/User" element={<User />} />
            <Route path="/product" element={<Product />} />
            <Route path="/category" element={<Category />} />
          </Routes>
          <FooterMenu />
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
