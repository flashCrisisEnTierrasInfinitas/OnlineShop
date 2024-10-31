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
import {
  BellIcon,
  LockOpenIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LoginIcon from "@mui/icons-material/Login";
import { Tooltip } from "@mui/joy";
import Cookies from "js-cookie";
import { Avatar, Badge, Button, styled } from "@mui/material";
import BasicMenu from "./avatars";

const styles = {
  btn: {
    background: "#2D477C",
  },
};

export default function Header(props) {
  const [visible, setVisible] = useState(false);

  var role = Cookies.get("role");
  var seccion = Cookies.get("seccion");
  var img = Cookies.get("img");
  var hastRole = role;

  const Admin = () => {
    if (hastRole == 1) {
      return (
        <Tooltip title="Administrador">
          <a href="/dahsboard/0" className="ico-navbar">
            <LockOpenIcon className="w-6 text-gray-500" />
          </a>
        </Tooltip>
      );
    }
  };

  const logout = async () => {
    const cookieNames = ["token", "role", "seccion", "id", "img"];
    cookieNames.forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    // Llamar a la función para eliminar cookies específicas (puedes personalizar el array según tus necesidades)
    // Refrescar la página
    window.location.reload();
  };

  const ValidateLogin = () => {
    if (seccion) {
      return (
        <Tooltip title="Login">
          <button
            onClick={logout}
            className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 bg-blue-700 hover:bg-blue-400 flex"
          >
            Salir
          </button>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Login">
          <a href="/au5Z4YhReMcxh1r0WdbGNrGiMU7+j6CfaUrMxP2TGJNv7ZgI72muOl1gie2Lc7da">
            <Button
              variant="contained"
              style={styles.btn}
              endIcon={<LoginIcon />}
            >
              Ingresa
            </Button>
          </a>
        </Tooltip>
      );
    }
  };

  const ValidateNotify = () => {
    if (seccion) {
      return (
        <Tooltip title="notificaciones">
          <a href="/notificaciones" className="ico-navbar">
            <Badge badgeContent={1} color="primary">
              <BellIcon className="w-6  h-6 text-gray-500" />
            </Badge>
          </a>
        </Tooltip>
      );
    }
  };

  return (
    <>
      <div className="navbarShop">
        <CContainer fluid>
          <div className="conter-navbar">
            {seccion && (
              <div className="toogel-nav">
                <button onClick={() => setVisible(!visible)} className="togel">
                  <i class="fa fa-bars" aria-hidden="true"></i>
                </button>
              </div>
            )}

            <div className="footer-img">
              <a href="/">
                <div>
                  <img src="/img/logos/logo1.png" className="logo-asupro" />
                </div>
              </a>
            </div>
            <div className="conter-ico-nav">
              <Tooltip title="Configuraciones">
                <BasicMenu role={role} img={img} seccion={seccion} />
              </Tooltip>
              <Admin />
              <ValidateNotify />
              <Tooltip title="Carrito" className="ico-navbar">
                <a href="/7Abq5P7EeFQM7HGxE/cDsMvM5/jPk1ZIuzGwbnuVyYI+f9RUtVrP4wVLaqftHwM/">
                  <ShoppingCartIcon className="h-6 w-6 text-gray-500" />
                </a>
              </Tooltip>
              <ValidateLogin />
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
                  <div>
                    <img src="/img/logos/logo1.png" className="logo-asupro" />
                  </div>
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
                  <CNavLink href="/" active>
                    <div className="conter-nav-li">
                      <i
                        class="fa fa-home color-secondary"
                        aria-hidden="true"
                      />
                      <label className="label-nav">Home</label>
                    </div>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/Profile" active>
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
                  <CNavLink
                    href="/Tz0QDp4ERS81rCCHx/YEWX4wTBveKdtl5szCsnv8iQv57RmjwNzB0HKzt97RBsFX"
                    active
                  >
                    <div className="conter-nav-li">
                      <i
                        class="fa fa-shopping-cart color-secondary"
                        aria-hidden="true"
                      />
                      <label className="label-nav">Pedidos</label>
                    </div>
                  </CNavLink>
                </CNavItem>
              </CNavbarNav>
            </COffcanvasBody>
            <div className="conter-log-red">
              <div>
                <img src="/img/icons/facebook_108044.svg" alt="" />
              </div>
              <div>
                <img src="/img/icons/instagram_108043.svg" alt="" />
              </div>
              <div>
                <img src="/img/icons/whatsapp_108042.svg" alt="" />
              </div>
            </div>
          </COffcanvas>
        </CContainer>
      </div>
      <div>{props.children}</div>
    </>
  );
}
