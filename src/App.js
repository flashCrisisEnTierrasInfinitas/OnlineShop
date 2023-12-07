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
import Shop from "./content/pages/store/shop";
import Sale from "./content/pages/store/sale";

function App() {
  //axios.defaults.baseURL ="https://apionlineshop.com.asuprocolombiasas.com/api";
  axios.defaults.baseURL = "http://localhost:8000/api";

  const seccion = Cookies.get("seccion");
  const token = Cookies.get("token");
  const [contNotifi, setContNotifi] = useState([]);

  const [addShop, setAddShop] = useState(() => {
    const saveEquipos = window.localStorage.getItem("addShop");
    if (saveEquipos) {
      return JSON.parse(saveEquipos);
    } else {
      return [];
    }
  });
  const [Total, setTotal] = useState(() => {
    const total = window.localStorage.getItem("Total");
    if (total) {
      return JSON.parse(total);
    } else {
      return [];
    }
  });

  useEffect(() => {
    // Almacenar en localStorage cuando addShop cambia
    window.localStorage.setItem("addShop", JSON.stringify(addShop));

    // Establecer un temporizador para limpiar localStorage después de una hora
    const limpiarDespuesDeUnaHora = () => {
      window.localStorage.removeItem("addShop");
    };

    const temporizador = setTimeout(
      limpiarDespuesDeUnaHora,
      2 * 60 * 60 * 1000
    ); // 1 hora en milisegundos

    // Eliminar el temporizador y limpiar localStorage cuando el componente se desmonta
    return () => {
      clearTimeout(temporizador);
      limpiarDespuesDeUnaHora();
    };
  }, [addShop]);

  useEffect(() => {
    // Almacenar en localStorage cuando Total cambia
    window.localStorage.setItem("Total", JSON.stringify(parseInt(Total, 10)));

    // Establecer un temporizador para limpiar localStorage después de una hora
    const limpiarDespuesDeUnaHora = () => {
      window.localStorage.removeItem("Total");
    };

    const temporizador = setTimeout(
      limpiarDespuesDeUnaHora,
      2 * 60 * 60 * 1000
    ); // 1 hora en milisegundos

    // Eliminar el temporizador y limpiar localStorage cuando el componente se desmonta
    return () => {
      clearTimeout(temporizador);
      limpiarDespuesDeUnaHora();
    };
  }, [Total]);

  return (
    <>
      <div className="App">
        <Router>
          <header className="App-header">
            <Header
              total={Total}
              setTotal={setTotal}
              Seccion={seccion}
              contNotifi={contNotifi}
            />
          </header>
          <Routes>
            <Route
              path="/"
              element={<Home total={Total} setTotal={setTotal} />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/ProductosCat" element={<ProductoCate />} />

            <Route
              path="/categoryProduct/:id"
              element={<CategoryProduct total={Total} setTotal={setTotal} />}
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
                path="/DetalleProduc/:id"
                element={
                  <DetalleProduc
                    Seccion={seccion}
                    addShop={addShop}
                    Total={Total}
                    setAddShop={setAddShop}
                    setTotal={setTotal}
                  />
                }
              />
              <Route
                path="/shop/sale"
                element={
                  <Sale
                    Seccion={seccion}
                    token={token}
                    Total={Total}
                    setTotal={setTotal}
                    setAddShop={setAddShop}
                    addShop={addShop}
                  />
                }
              />
              <Route
                path="/shop"
                element={
                  <Shop
                    Seccion={seccion}
                    token={token}
                    Total={Total}
                    setTotal={setTotal}
                    setAddShop={setAddShop}
                    addShop={addShop}
                  />
                }
              />
              <Route
                path="/pay"
                element={
                  <Pay
                    Seccion={seccion}
                    addShop={addShop}
                    Total={Total}
                    setAddShop={setAddShop}
                    setTotal={setTotal}
                  />
                }
              />
              <Route
                path="/oficina"
                element={
                  <Oficina
                    total={Total}
                    setTotal={setTotal}
                    Seccion={seccion}
                  />
                }
              />
              <Route path="/Profile" element={<Profile />} />
              <Route
                path="/notificaciones"
                element={
                  <Notificaciones
                    Seccion={seccion}
                    token={token}
                    setContNotifi={setContNotifi}
                  />
                }
              />
              <Route path="/Historial" element={<Historial />} />
              <Route path="/MiLista" element={<MiLista seccion={seccion} />} />
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
