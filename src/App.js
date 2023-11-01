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
import CategoryProduct from "./content/pages/store/categoryProduct";
import DetalleProduc from "./content/pages/store/detalle";
import protectedRoute from "./Auth/ProtectedRoute";
import protectedUser from "./Auth/RoutesUser";
import Cookies from "js-cookie";
import Oficina from "./content/pages/store/oficina";

function App() {
  axios.defaults.baseURL ="https://apionlineshop.com.asuprocolombiasas.com/api";
  //axios.defaults.baseURL = "http://localhost:8000/api";
  const seccion = Cookies.get("seccion");
  const token = Cookies.get("token");
  const [contNotifi,setContNotifi]=useState([]);
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

  // Guarda la fecha de expiración en localStorage
  const setExpiration = (minutes) => {
    const now = new Date();
    const expiration = new Date(now.getTime() + minutes * 60000); // Agrega minutos
    window.localStorage.setItem("expiration", expiration);
  };

  // Esta función verifica si los datos han expirado y los elimina
  const checkExpiration = () => {
    const expiration = new Date(window.localStorage.getItem("expiration"));
    const now = new Date();
    if (now > expiration) {
      // Los datos han expirado, elimínalos
      window.localStorage.removeItem("modals");
      window.localStorage.removeItem("expiration");
    }
  };

  // Establece la expiración al montar el componente
  useEffect(() => {
    setExpiration(10); // 10 minutos en minutos
  }, []);

  // Verifica y elimina datos expirados al montar el componente
  useEffect(() => {
    checkExpiration();
  }, []);

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
              Seccion={seccion}
              contNotifi={contNotifi}
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

            <Route path="/login" element={<Login/>} />
            <Route path="/ProductosCat" element={<ProductoCate />} />
            <Route
              path="/DetalleProduc/:id"
              element={
                <DetalleProduc
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
              path="/categoryProduct/:id"
              element={
                <CategoryProduct
                  allProducts={allProducts}
                  setAllproducts={setAllproducts}
                  total={total}
                  setTotal={setTotal}
                  countProducts={countProducts}
                  setCountProducts={setCountProducts}
                />
              }
            />
            {/* TODO:routes the admin */}
            <Route element={protectedRoute()}>
              <Route path="/dahsboard" element={<DahsboardAdmin />} />
              <Route path="/User" element={<User />} />
              <Route path="/product" element={<Product />} />
              <Route path="/category" element={<Category />} />
            </Route>
            {/* rutas del usuario */}
            <Route element={protectedUser()}>
              <Route
                path="/pay"
                element={
                  <Pay
                    total={total}
                    setAllproducts={setAllproducts}
                    setTotal={setTotal}
                    setCountProducts={setCountProducts}
                    allProducts={allProducts}
                    Seccion={seccion}
                  />
                }
              />
              <Route
                path="/oficina"
                element={
                  <Oficina
                    total={total}
                    setAllproducts={setAllproducts}
                    setTotal={setTotal}
                    setCountProducts={setCountProducts}
                    allProducts={allProducts}
                    Seccion={seccion}
                  />
                }
              />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/notificaciones" element={<Notificaciones Seccion={seccion} token={token} setContNotifi={setContNotifi}/>} />
              <Route path="/Historial" element={<Historial />} />
              <Route path="/MiLista" element={<MiLista seccion={seccion}/>} />
            </Route>
          </Routes>
          <FooterMenu />
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
