import React, { useState } from "react";
import {
  CNavbarNav,
  CContainer,
  COffcanvas,
  COffcanvasHeader,
  CCloseButton,
  COffcanvasBody,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import { Button, Tooltip } from "@mui/joy";
import Cookies from "js-cookie";
import Drawers from "./drawers";

export default function Header({
  allProducts,
  setAllproducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
  Seccion,
  contNotifi
}) {
  const [visible, setVisible] = useState(false);
  const [Open, setOpen] = useState(false);

  var role = Cookies.get('role');
  var hastRole = role;

  const formattedNumber = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(total);


  const MenuPro = () => {
    return (
      <div className="box-tar-menu">
        <div className="container-cart-products">
          {allProducts.length ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">
                        {product.quantity}
                      </span>
                      <p className="titulo-producto-carrito">
                        {product.nombrePro}
                      </p>
                      <div className="img-menu">
                        <img src={product.img} alt="" />
                      </div>
                      <span className="precio-producto-carrito">
                        ${product.precioPro}
                      </span>
                    </div>
                    <a
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </a>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">{formattedNumber}</span>
              </div>
              <div className="grid">
                <Button onClick={() => onCleanCart()}>Vaciar Carrito</Button>
                <Drawers Seccion={Seccion}
                  setAllproducts={setAllproducts}
                  setCountProducts={setCountProducts}
                  setTotal={setTotal}
                  allProducts={allProducts}
                />
              </div>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>
    );
  };

  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);

    setTotal(total - product.precioPro * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllproducts(results);
  };

  const onCleanCart = () => {
    setAllproducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  const Admin = () => {
    if (hastRole == 1) {
      return (
        <a href="/dahsboard">
          <i class="fa fa-lock" aria-hidden="true"></i>
        </a>
      )
    }
  }

  return (
    <header>
      <nav className="navbarShop">
        <CContainer fluid>
          <div className="conter-navbar">
            <div className="toogel-nav">
              <button onClick={() => setVisible(!visible)} className="togel">
                <i class="fa fa-bars" aria-hidden="true"></i>
              </button>
            </div>
            <div className="footer-img">
              <a href="/">
                <div>
                  <img src="/img/logos/logo1.png" className="logo-asupro" />
                </div>
              </a>
            </div>
            <div className="conter-ico-nav">
              <a href="/Profile">
               admin
              </a>
              <Admin />
              <a href="/notificaciones">
                <i className="fa fa-bell" aria-hidden="true">
                  <span className="conterProduct">{contNotifi}</span>
                </i>
              </a>
              <a onClick={() => setOpen(!Open)}>
                <i class="fa fa-shopping-cart" aria-hidden="true">
                  <span className="conterProduct">{countProducts}</span>
                </i>
              </a>
              <div className="conter-menu-pro">{Open ? <MenuPro /> : ""}</div>
              <a href="/login">
                <i className="fa fa-sign-in" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <COffcanvas
            id="offcanvasNavbar"
            portal={false}
            visible={visible}
            onHide={() => setVisible(false)}
            className="position-nav"
          >
            <COffcanvasHeader>
              <div className="footer-img">
                <a href="/">
                  <p>ASUPRO</p>
                </a>
              </div>
              <CCloseButton
                className="text-reset"
                onClick={() => setVisible(false)}
              />
            </COffcanvasHeader>
            <COffcanvasBody>
              <CNavbarNav>
                <CNavItem>
                  <CNavLink href="/Profile" active className="top-50">
                    <div className="conter-nav-li">
                      <i
                        class="fa fa-cog color-secondary"
                        aria-hidden="true"
                      ></i>
                      <label className="label-nav">Mi perfil</label>
                    </div>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/notificaciones" active>
                    <div className="conter-nav-li">
                      <i
                        class="fa fa-bell color-secondary"
                        aria-hidden="true"
                      ></i>
                      <label className="label-nav">Notificaciones</label>
                    </div>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/Historial" active>
                    <div className="conter-nav-li">
                      <i
                        class="fa fa-clock color-secondary"
                        aria-hidden="true"
                      ></i>
                      <label className="label-nav">Historial</label>
                    </div>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/MiLista" active>
                    <div className="conter-nav-li">
                      <i
                        class="fa fa-th-list color-secondary"
                        aria-hidden="true"
                      ></i>
                      <label className="label-nav">Mi lista</label>
                    </div>
                  </CNavLink>
                </CNavItem>
              </CNavbarNav>
            </COffcanvasBody>
            <div className="conter-log-red">
              <div>
                <img src="img/icons/facebook_108044.svg" alt="" />
              </div>
              <div>
                <img src="img/icons/instagram_108043.svg" alt="" />
              </div>
              <div>
                <img src="img/icons/whatsapp_108042.svg" alt="" />
              </div>
            </div>
          </COffcanvas>
        </CContainer>
      </nav>
    </header>
  );
}
