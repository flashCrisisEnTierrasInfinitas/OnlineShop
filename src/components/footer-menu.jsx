export default function FooterMenu() {
    return (
        <div className="conter-footer-menu">
            <div className="box-menu grid">
                <div>
                    <a href="/" className="a-footerMenu">
                        <div className="conte-text-img">
                            <i
                                class="fa fa-shopping-bag color-secondary"
                                aria-hidden="true"
                            ></i>
                            <p className="color-gray">Tienda</p>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="#searchPro">
                        <div className="conte-text-img">
                            <i class="fa fa-search color-secondary" aria-hidden="true"></i>
                            <p className="color-gray">Buscar</p>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="/ProductosCat">
                        <div className="conte-text-img">
                            <i class="fa fa-tasks color-secondary" aria-hidden="true"></i>
                            <p className="color-gray">Productos</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
