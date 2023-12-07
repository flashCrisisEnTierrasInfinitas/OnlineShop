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

import { Tooltip } from "@mui/joy";
import Cookies from "js-cookie";

export default function Header({
  contNotifi,
}) {
  const [visible, setVisible] = useState(false);

  var role = Cookies.get("role");
  var seccion = Cookies.get("seccion");
  var hastRole = role;

  const Admin = () => {
    if (hastRole == 1) {
      return (
        <Tooltip title="Administrador">
          <a href="/dahsboard/0">
            <i class="fa-solid fa-user-lock"></i>
          </a>
        </Tooltip>
      );
    }
  };

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
              <Tooltip title="Profile">
                <a
                  href="/Profile"
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  {seccion}
                </a>
              </Tooltip>
              <Admin />
              <Tooltip title="notificaciones">
                <a href="/notificaciones">
                  <i className="fa fa-bell" aria-hidden="true">
                    <span className="conterProduct">{contNotifi}</span>
                  </i>
                </a>
              </Tooltip>
              <Tooltip title="Carrito">
                <a href="/shop">
                  <i class="fa fa-shopping-cart" aria-hidden="true">
                    <span className="conterProduct"></span>
                  </i>
                </a>
              </Tooltip>
              <Tooltip title="Login">
                <a href="/login">
                  <i className="fa fa-sign-in" aria-hidden="true"></i>
                </a>
              </Tooltip>
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
