import { CFooter, CLink } from "@coreui/react";

export default function Footer() {
  return (
    <div className="conter-footer">
      <CFooter className="margin-90 bottom-50 info-footer">
        <div>
          <h1>ASUPRO</h1>
          <p>
            Las Tiendas ASUPRO COLOMBIA proporcionan a todos sus clientes una
            amplia variedad de opciones, ofreciendo comodidad y acceso las 24
            horas día, para seleccionar sus productos y servicios.
          </p>
        </div>
        <div>
          <h1>CONTACTOS</h1>
          <div className="conter-cont-footer">
            <div>
              <i className="fa fa-home" aria-hidden="true" />
              <p>Pitalito huila</p>
            </div>
            <div>
              <i className="fa fa-envelope" aria-hidden="true" />
              <p>asupro@gmail.com</p>
            </div>
            <div>
              <i className="fa fa-mobile" aria-hidden="true" />
              <p>+57 310 2055841</p>
            </div>
            <div>
              <i className="fa fa-fax" aria-hidden="true" />
              <p>+57 310 2055841</p>
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
