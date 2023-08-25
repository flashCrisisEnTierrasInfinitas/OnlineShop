import React, { useState } from 'react';
import {
    CNavbarNav,
    CContainer,
    COffcanvas,
    COffcanvasHeader,
    COffcanvasTitle,
    CCloseButton,
    COffcanvasBody,
    CNavItem,
    CNavLink,
    CForm,
    CFormInput,
    CButton,
} from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

export default function Header() {
    const [visible, setVisible] = useState(false);

    return (
        <header>
            <nav className='navbarShop'>
                <CContainer fluid>
                    <div className="conter-navbar">
                        <div className='toogel-nav'>
                            <button onClick={() => setVisible(!visible)} className='togel'><i class="fa fa-bars" aria-hidden="true"></i></button>
                        </div>
                        <div className="footer-img">
                            <a href="#">
                                <p>ASUPRO</p>
                                <label>colombia</label>
                            </a>
                        </div>
                        <div className='conter-ico-nav'>
                            <a href="#"><i class="fa fa-user" aria-hidden="true"></i></a>
                            <a href="#"><i class="fa fa-heart" aria-hidden="true"></i></a>
                            <a href="#"><i class="fa fa-shopping-bag" aria-hidden="true"></i></a>
                            <a href="#"><i class="fa fa-sign-in" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <COffcanvas
                        id="offcanvasNavbar"
                        portal={false}
                        visible={visible}
                        onHide={() => setVisible(false)}
                        className='position-nav'
                    >
                        <COffcanvasHeader>
                            <div className="footer-img">
                                <a href="#">
                                    <p>ASUPRO</p>
                                    <label>colombia</label>
                                </a>
                            </div>
                            <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                        </COffcanvasHeader>
                        <COffcanvasBody>
                            <CNavbarNav>
                                <CForm className="d-flex">
                                    <CFormInput type="search" className="me-2" placeholder="Search" />
                                    <CButton type="submit" color="success" variant="outline">
                                        Search
                                    </CButton>
                                </CForm>
                                <CNavItem className='top-20'>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/store" active className='top-50'>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-cog" aria-hidden="true"></i>
                                            <label className='label-nav'>Mi perfil</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/user" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-bell" aria-hidden="true"></i>
                                            <label className='label-nav'>Notificaciones</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/testimonios" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-clock" aria-hidden="true"></i>
                                            <label className='label-nav'>Historial</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/correos" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-th-list" aria-hidden="true"></i>
                                            <label className='label-nav'>Mi lista</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/producto" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-briefcase" aria-hidden="true"></i>
                                            <label className='label-nav'>Servicios</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/producto" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-envelope" aria-hidden="true"></i>
                                            <label className='label-nav'>Contáctenos</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/producto" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-envelope" aria-hidden="true"></i>
                                            <label className='label-nav'>Servicios</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/producto" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                                            <label className='label-nav'>Terminos</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                  <div className="conter-log-red">

                                  </div>
                                </CNavItem> 
                            </CNavbarNav>
                        </COffcanvasBody>
                    </COffcanvas>
                </CContainer>
            </nav>
        </header>
    )
}
