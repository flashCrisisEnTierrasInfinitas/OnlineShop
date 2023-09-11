import {
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  COffcanvas,
  COffcanvasBody,
  COffcanvasTitle,
  COffcanvasHeader,
  CCloseButton,
  CNavItem,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CDropdownToggle,
  CDropdownDivider,
} from "@coreui/react";
import { useState } from "react";

export default function AppBarAdmin() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="conter-appBar">
      <CNavbar colorScheme="light">
        <CContainer fluid>
          <CNavbarBrand>Offcanvas navbar</CNavbarBrand>
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
              <COffcanvasTitle>Offcanvas</COffcanvasTitle>
              <CCloseButton
                className="text-reset"
                onClick={() => setVisible(false)}
              />
            </COffcanvasHeader>
            <COffcanvasBody>
              <CNavbarNav>
                <CNavItem>
                  <a href="#" active>
                    Home
                  </a>
                </CNavItem>
                <CNavItem>
                  <a href="#">Link</a>
                </CNavItem>
                <CDropdown variant="nav-item" popper={false}>
                  <CDropdownToggle color="secondary">
                    Dropdown button
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CNavbarNav>
            </COffcanvasBody>
          </COffcanvas>
        </CContainer>
      </CNavbar>
    </div>
  );
}
