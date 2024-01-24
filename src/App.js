//! app de la pagina web
//* creador: jhon mario(WHOAOMI)
//? fecha creacion: 2023
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import FooterMenu from "./components/footer-menu";
import Header from "./components/header";
import Home from "./content/pages/home/Home";
import Pay from "./content/pages/store/ pay";
import Login from "./Auth/login";
import ProductoCate from "./content/pages/store/producCate";
import Profile from "./content/pages/dastboard/profile";
import Footer from "./components/Footer";
import Notificaciones from "./content/pages/dastboard/notificaciones";
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
import Recouper from "./Auth/recoper";
import { Password } from "@mui/icons-material";
import MisPediso from "./content/pages/store/misPedidos";
import DetallePedidos from "./content/pages/store/misPedidos/detallePedidos";

function App() {
  //axios.defaults.baseURL =
  //"https://apionlineshop.com.asuprocolombiasas.com/api";
  axios.defaults.baseURL = "http://127.0.0.1:8000/api";

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
          <Routes>
            <Route path="*" element="Pague no fount" />
            <Route
              path="/au5Z4YhReMcxh1r0WdbGNrGiMU7+j6CfaUrMxP2TGJNv7ZgI72muOl1gie2Lc7da"
              element={<Login />}
            />
            <Route
              path="/Lni9803g75E53U7Bg8xJz2xO+YrC/grPE/fxZ8GXSyuCtRzLqx6N782CTR03G99NLDfn6hadAE6M0TTOCHrlLdox0VWEY5o7eZ6OKBf28V7n+AEonVXxDk8VTGTjZVcJ"
              element={<Recouper />}
            />
            <Route
              path="/passwordiOayZeVxSvoDiApgNRlsvR4GZpTkd3ojalp3PFwboixkoV3L1E/9V2JlOIY4GpVK"
              element={<Password />}
            />
            <Route
              element={
                <Header
                  total={Total}
                  setTotal={setTotal}
                  Seccion={seccion}
                  contNotifi={contNotifi}
                >
                  <Outlet />
                </Header>
              }
            >
              <Route
                path="/"
                element={<Home total={Total} setTotal={setTotal} />}
              />
              <Route path="/ProductosCat" element={<ProductoCate />} />
              <Route
                path="/categoryProduct/:id"
                element={<CategoryProduct total={Total} setTotal={setTotal} />}
              />
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
                path="/7Abq5P7EeFQM7HGxE/cDsMvM5/jPk1ZIuzGwbnuVyYI+f9RUtVrP4wVLaqftHwM/"
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
              <Route path="/Profile" element={<Profile />} />
              <Route element={protectedUser()}>
                <Route
                  path="/ZeKqxkrThE4FooASf8FMC/0HAefmTli6V1MVBq09hqQXCwLNp22ESEd4pdKH5xiL"
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
                  path="/Tz0QDp4ERS81rCCHx/YEWX4wTBveKdtl5szCsnv8iQv57RmjwNzB0HKzt97RBsFX"
                  element={<MisPediso Seccion={seccion} />}
                />
                <Route
                  element={<DetallePedidos />}
                  path="/k/PRLpMj2FjF1BazAE8N4VCpYpq12Mx1oAe5mfHgUgFerURJTOG1NtcErOcZX458/:id"
                />
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
              </Route>
            </Route>
            {/* TODO:routes the admin */}
            <Route element={protectedRoute()}>
              <Route path="/dahsboard/:id" element={<DahsboardAdmin />} />
              <Route path="/User" element={<User />} />
              <Route path="/product" element={<Product />} />
              <Route path="/category" element={<Category />} />
            </Route>
            {/* rutas del usuario */}
          </Routes>
          <FooterMenu />
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
