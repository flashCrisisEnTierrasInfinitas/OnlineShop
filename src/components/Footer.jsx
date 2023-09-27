import { CFooter, CLink } from "@coreui/react";

export default function Footer() {
  return (
    <div className="conter-footer">
      <CFooter className="margin-90 bottom-50 info-footer">
        <div>
          <h1>ASUPRO</h1>
          <p>
            Here you can use rows and columns to organize your footer content.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <div className="pro-footer">
          <h1>PRODUCTOS</h1>
          <li>
            <a href="ProductosCat">VERDURAS</a>
          </li>
          <li>
            <a href="ProductosCat">FRUTAS</a>
          </li>
          <li>
            <a href="ProductosCat">LEGUMBRES</a>
          </li>
        </div>
        <div>
          <h1>PAGOS</h1>
          <div className="footer-logos-pay">
            <div>
              <img src="/img/icons/nequi-2.svg" />
            </div>
            <div>
              <img src="/img/icons/daviplata.svg" />
            </div>
          </div>
        </div>
        <div>
          <h1>CONTACTOS</h1>
          <div className="conter-cont-footer">
            <div>
              <i className="fa fa-home" aria-hidden="true" />
              <p>Pitalito huila</p>
            </div>
            <div>
              <i className="fa fa-envelope" aria-hidden="true"/>
              <p>asupro@gmail.com</p>
            </div>
            <div>
              <i className="fa fa-mobile" aria-hidden="true"/>
              <p>+57 3115339060</p>
            </div>
            <div>
              <i className="fa fa-fax" aria-hidden="true"/>
              <p>+57 3115339060</p>
            </div>
          </div>
        </div>
      </CFooter>
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
    </div>
  );
}
