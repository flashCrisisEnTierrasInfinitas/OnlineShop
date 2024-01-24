import { useState } from "react";
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
import SettingsPowerIcon from "@mui/icons-material/SettingsPower";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import HailIcon from "@mui/icons-material/Hail";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

export default function AppBarAdmin() {
  const [visible, setVisible] = useState(false);
  return (
    <CNavbar colorScheme="light" className="conter-appBar">
      <CContainer fluid>
        <CNavbarBrand className="flex">
          <div className="logo-admin ">
            <a href="/">
              <div>
                <img src="/img/logos/logo1.png" />
              </div>
            </a>
          </div>
          <div
            style={{
              marginLeft: "20px",
            }}
          ></div>
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
          className="with-navbar"
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
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">
                  <div style={{ display: "flex" }}>
                    <div className="ico-menu">
                      <img src="/img/icons/school_81290.png" />
                    </div>
                    <label>Pedidos</label>
                  </div>
                </CDropdownToggle>
                <CDropdownMenu>
                  <div className="footer-nav-admins">
                    <a href="/dahsboard/0">
                      <div className="ico-menu">
                        <HailIcon />
                      </div>
                      <label>Nuevos</label>
                    </a>
                    <a href="/dahsboard/4">
                      <div className="ico-menu">
                        <OutdoorGrillIcon />
                      </div>
                      <label>En preparación</label>
                    </a>
                    <a href="/dahsboard/2">
                      <div className="ico-menu">
                        <SendIcon />
                      </div>
                      <label>Enviados</label>
                    </a>
                    <a href="/dahsboard/3">
                      <div className="ico-menu">
                        <HandshakeIcon />
                      </div>
                      <label>Entregados</label>
                    </a>
                    <a href="/dahsboard/1">
                      <div className="ico-menu">
                        <ContentCutIcon />
                      </div>
                      <label>Cancelados</label>
                    </a>
                  </div>
                </CDropdownMenu>
              </CDropdown>
              <a href="/User" className="text-appBar">
                <div className="ico-menu">
                  <img src="/img/icons/avatardefault_92824.png" />
                </div>
                <label>Usuarios</label>
              </a>
              <a href="/category" className="text-appBar">
                <div className="ico-menu">
                  <img src="/img/icons/category.png" />
                </div>
                <label>Categoria</label>
              </a>
              <a href="/product" className="text-appBar">
                <div className="ico-menu">
                  <img src="/img/icons/shopping.png" />
                </div>
                <label>Productos</label>
              </a>
              <div className="footer-nav-admin">
                <a href="/">
                  <div className="ico-menu">
                    <HomeIcon />
                  </div>
                  <label>Home</label>
                </a>
                <a href="/au5Z4YhReMcxh1r0WdbGNrGiMU7+j6CfaUrMxP2TGJNv7ZgI72muOl1gie2Lc7da">
                  <div className="ico-menu">
                    <SettingsPowerIcon />
                  </div>
                  <label>Power Off</label>
                </a>
              </div>
            </CNavbarNav>
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  );
}
