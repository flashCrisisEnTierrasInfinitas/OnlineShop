import { useState } from "react";
import CIcon from "@coreui/icons-react";
import { cilX } from "@coreui/icons";
import {
  CCloseButton,
  CContainer,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react";

export default function AppBarAdmin() {

  const [visible, setVisible] = useState(false);
  return (
    <CNavbar colorScheme="light" className="conter-appBar">
      <CContainer fluid>
        <CNavbarBrand>
        <div className="logo-admin ">
              <a href="/">
                <div>
                  <img src="img/logos/logo1.png" />
                </div>
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
                  <img src="img/icons/meterdashmac.png" />
                </div>
                <label>Dahsboard</label>
              </a>
              <a href="/User" className="text-appBar">
                <div className="ico-menu">
                  <img src="img/icons/avatardefault_92824.png" />
                </div>
                <label>Usuarios</label>
              </a>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">
                  <label>Productos</label>
                </CDropdownToggle>
                <CDropdownMenu>
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
                </CDropdownMenu>
              </CDropdown>
            </CNavbarNav>
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  );
}
