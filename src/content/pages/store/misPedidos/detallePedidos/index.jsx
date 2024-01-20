import { Button, Chip } from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CancelIcon from "@mui/icons-material/Cancel";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const styles = {
  anvance: {
    backgroundColor: "#2D477C",
  },
};
export default function DetallePedidos() {
  return (
    <div className="conter-deta-pedi">
      <div className="head-deta-pedi">
        <div className="title-head-deta-pedi">
          <h5>PEDIDO</h5>
          <label># 123456</label>
        </div>
        <div>
          <label>27 de diciembre de 2023</label>
          <div className="flex">
            <Button
              style={{
                background: "#2D477C",
                width: "100%",
                color: "#fff",
              }}
            >
              Preparando
            </Button>
          </div>
        </div>
      </div>
      <div className="grid body-deta-pedi">
        <div className="targe-deta-pedi">
          <h6>Dirección</h6>
          <div>
            <label>JOSE ORDONEY CUELLAR</label>
          </div>
          <div>
            <label>CALLE 7A #4-47 ALMACEN HOGAR & STILO</label>
          </div>
          <div>
            <label>Colombia</label>
          </div>
        </div>
        <div className="targe-deta-pedi">
          <h6>Forma de pago</h6>
          <div>
            <label>EFECTIVO</label>
            <label>$ 291.750,00</label>
          </div>
          <div>
            <label>Informaciones adicionales</label>
          </div>
        </div>
        <div className="targe-deta-pedi">
          <h6>Resumen</h6>
          <div className="">
            <label>Subtotal</label>
            <label>$ 399.990</label>
          </div>
          <div>
            <label>Consto del envio</label>
            <label>$ 0.0</label>
          </div>
          <div>
            <label>Total</label>
            <label>$ 399.990</label>
          </div>
        </div>
      </div>
      <div className="grid list-pro-deta-pedi">
        <div className="target-list-deta-pedi">
          <div>
            <img
              src="https://multimedia-gs.s3.amazonaws.com/Data_StagingProducts/5861030844-9.jpg"
              alt=""
            />
          </div>
          <div>
            <label>Licuadora</label>
          </div>
          <div>
            <Chip label="1" />
          </div>
          <div>
            <label>$399.990</label>
          </div>
        </div>
      </div>
      <div className="footer-deta-pedi">
        <div>
          <h6>Estado Del Pedido</h6>
        </div>
        <div className="grid avances-deta-pedi">
          <div>
            <div className="indicador">
              <label style={styles.anvance}>
                <BorderColorIcon />
              </label>
              <div style={styles.anvance} />
            </div>
            <div>
              <p>Pendiente</p>
            </div>
          </div>
          <div>
            <div className="indicador">
              <label style={styles.anvance}>
                <OutdoorGrillIcon />
              </label>
              <div style={styles.anvance} />
            </div>
            <div>
              <p>preparando pedido</p>
            </div>
          </div>
          <div>
            <div className="indicador">
              <label style={styles.anvance}>
                <LocalShippingIcon />
              </label>
              <div style={styles.anvance} />
            </div>
            <div>
              <p>pedido enviado o listo para recoger</p>
            </div>
          </div>
          <div>
            <div className="indicador">
              <label>
                <HandshakeIcon />
              </label>
              <div />
            </div>
            <div>
              <p>Entregado</p>
            </div>
          </div>
          <div>
            <div className="indicador">
              <label>
                <CancelIcon />
              </label>
            </div>
            <div>
              <p>Cancelado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
