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
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LoginIcon from "@mui/icons-material/Login";

import { Tooltip } from "@mui/joy";
import Cookies from "js-cookie";
import { Avatar, Badge, Button, styled } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

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
            <LockPersonIcon />
          </a>
        </Tooltip>
      );
    }
  };

  const ValidateAvatar = () => {
    if (role) {
      return (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt={seccion} src={img} />
        </StyledBadge>
      );
    }
  };

  const logout = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const nombre = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = nombre + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    // Refrescar la página
    window.location.reload();
  };

  const ValidateLogin = () => {
    if (seccion) {
      return (
        <Tooltip title="Login">
          <Button
            variant="contained"
            style={styles.btn}
            endIcon={<LogoutIcon />}
            onClick={logout}
          >
            salir
          </Button>
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
              <NotificationsActiveIcon />
            </Badge>
          </a>
        </Tooltip>
      );
    } else {
      <Tooltip title="notificaciones">
        <a href="/notificaciones" className="ico-navbar">
          <Badge color="primary">
            <NotificationsActiveIcon />
          </Badge>
        </a>
      </Tooltip>;
    }
  };

  return (
    <>
      <div className="navbarShop">
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
                  <ValidateAvatar />
                </a>
              </Tooltip>
              <Admin />
              <ValidateNotify />
              <Tooltip title="Carrito" className="ico-navbar">
                <a href="/7Abq5P7EeFQM7HGxE/cDsMvM5/jPk1ZIuzGwbnuVyYI+f9RUtVrP4wVLaqftHwM/">
                  <ShoppingCartCheckoutIcon />
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
              <div>
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
      </div>
      <div>{props.children}</div>
    </>
  );
}
