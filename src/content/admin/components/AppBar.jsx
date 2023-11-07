import { useState } from "react";
import {
  CButton,
  CCloseButton,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react";
import { Button } from "@mui/joy";

export default function AppBarAdmin() {

  const [visible, setVisible] = useState(false);
  return (
    <CNavbar colorScheme="light" className="conter-appBar">
      <CContainer fluid>
        <CNavbarBrand className="flex">
          <div className="logo-admin ">
            <a href="/">
              <div>
                <img src="img/logos/logo1.png" />
              </div>
            </a>
          </div>
          <div style={{
            marginLeft:'20px'
          }}>
            <a href="/login">
            <CButton variant="outline">
              Login
            </CButton>
            </a>
          </div>
        </CNavbarBrand>
        <CNavbarToggler
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          onClick={() => setVisible(!visible)}
        />
        <COffcanvas
          id="offcanvasNavbar"
          placement="end"
          portal={false}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <COffcanvasHeader>
            <COffcanvasTitle>ASUPRO</COffcanvasTitle>
            <CCloseButton
              className="text-reset"
              onClick={() => setVisible(false)}
            />
          </COffcanvasHeader>
          <COffcanvasBody>
            <CNavbarNav>
              <a href="/" className="text-appBar">
                <div className="ico-menu">
                  <img src="img/icons/iconfinder-home.png" />
                </div>
                <label>Home</label>
              </a>
              <a href="/dahsboard" className="text-appBar">
                <div className="ico-menu">
                  <img src="img/icons/school_81290.png" />
                </div>
                <label>Mi diario</label>
              </a>
              <a href="/User" className="text-appBar">
                <div className="ico-menu">
                  <img src="img/icons/avatardefault_92824.png" />
                </div>
                <label>Usuarios</label>
              </a>
              <a href="/category" className="text-appBar">
                <div className="ico-menu">
                  <img src="img/icons/category.png" />
                </div>
                <label>Categoria</label>
              </a>
              <a href="/product" className="text-appBar">
                <div className="ico-menu">
                  <img src="img/icons/shopping.png" />
                </div>
                <label>Lista</label>
              </a>
            </CNavbarNav>
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  );
}
