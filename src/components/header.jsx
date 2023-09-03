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

export default function Header({
    allProducts,
    setAllproducts,
    countProducts,
    setCountProducts,
    total,
    setTotal
}) {
    const [visible, setVisible] = useState(false);

    const [Open, setOpen] = useState(false)


    const MenuPro = () => {
        return (
            <div className="box-tar-menu">
                <div
                    className="container-cart-products"
                >
                    {allProducts.length ? (
                        <>
                            <div className='row-product'>
                                {allProducts.map(product => (
                                    <div className='cart-product' key={product.id}>
                                        <div className='info-cart-product'>
                                            <span className='cantidad-producto-carrito'>
                                                {product.quantity}
                                            </span>
                                            <p className='titulo-producto-carrito'>
                                                {product.title.toUpperCase()}
                                            </p>
                                            <div className='img-menu'>
                                                <img src={product.img} alt="" />
                                            </div>
                                            <span className='precio-producto-carrito'>
                                                ${product.price}
                                            </span>
                                        </div>
                                        <a className='icon-close' onClick={() => onDeleteProduct(product)}><i class="fa fa-trash" aria-hidden="true"></i></a>
                                    </div>
                                ))}
                            </div>
                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total}</span>
                            </div>
                            <div className='con-btn-menu'>
                                <button className='btn-clear-all btn-secondary' onClick={() => onCleanCart()}>
                                    Vaciar Carrito
                                </button>
                                <a href='/pay' className='btn-clear-all btn-primary'>
                                    Proceder al pago
                                </a>
                            </div>

                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )}
                </div>
            </div>
        )
    }

    const onDeleteProduct = product => {
        const results = allProducts.filter(
            item => item.id !== product.id
        );

        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllproducts(results);
    };

    const onCleanCart = () => {
        setAllproducts([]);
        setTotal(0);
        setCountProducts(0);
    };

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
                            <a href=""><i className="fa fa-user" aria-hidden="true"></i></a>
                            <a href=""><i className="fa fa-heart" aria-hidden="true"></i></a>
                            <a onClick={() => setOpen(!Open)}><i class="fa fa-shopping-bag" aria-hidden="true"><span className='conterProduct'>{countProducts}</span></i></a>
                            <div className="conter-menu-pro">
                                {Open ? <MenuPro /> : ''}
                            </div>
                            <a href="/login"><i className="fa fa-sign-in" aria-hidden="true"></i></a>
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
                                <a href="/">
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
                                            <i class="fa fa-cog color-secondary" aria-hidden="true"></i>
                                            <label className='label-nav'>Mi perfil</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/user" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-bell color-secondary" aria-hidden="true"></i>
                                            <label className='label-nav'>Notificaciones</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/testimonios" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-clock color-secondary" aria-hidden="true"></i>
                                            <label className='label-nav'>Historial</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/correos" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-th-list color-secondary" aria-hidden="true"></i>
                                            <label className='label-nav'>Mi lista</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/producto" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-briefcase color-secondary" aria-hidden="true"></i>
                                            <label className='label-nav'>Servicios</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/producto" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-envelope color-secondary" aria-hidden="true"></i>
                                            <label className='label-nav'>Contáctenos</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/producto" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-server color-secondary" aria-hidden="true"></i>
                                            <label className='label-nav'>Servicios</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="/admin/producto" active>
                                        <div className="conter-nav-li">
                                            <i class="fa fa-info-circle color-secondary" aria-hidden="true"></i>
                                            <label className='label-nav'>Terminos</label>
                                        </div>
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>

                                </CNavItem>

                            </CNavbarNav>

                        </COffcanvasBody>
                        <div className="conter-log-red">
                            <div><img src="img/icons/facebook_108044.svg" alt="" /></div>
                            <div><img src="img/icons/instagram_108043.svg" alt="" /></div>
                            <div><img src="img/icons/whatsapp_108042.svg" alt="" /></div>
                        </div>
                    </COffcanvas>
                </CContainer>
            </nav>
        </header>
    )
}
