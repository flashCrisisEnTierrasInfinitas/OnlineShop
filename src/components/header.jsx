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

import { Tooltip } from "@mui/joy";
import Cookies from "js-cookie";
import { Avatar, Badge, styled } from "@mui/material";

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

export default function Header({ contNotifi }) {
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
                  <ValidateAvatar />
                </a>
              </Tooltip>
              <Admin />
              <Tooltip title="notificaciones">
                <a href="/notificaciones" className="ico-navbar">
                  <Badge badgeContent={1} color="primary">
                    <NotificationsActiveIcon />
                  </Badge>
                </a>
              </Tooltip>
              <Tooltip title="Carrito" className="ico-navbar">
                <a href="/shop">
                  <ShoppingCartCheckoutIcon />
                </a>
              </Tooltip>
              <Tooltip title="Login" className="ico-navbar">
                <a href="/login">
                  <LogoutIcon />
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
