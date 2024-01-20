import { Button, Chip } from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CancelIcon from "@mui/icons-material/Cancel";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { CSpinner } from "@coreui/react";
import isMountedRef from "../../../../../hooks/useRefMounted";
import ListProd from "./listProd";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const styles = {
  anvance: {
    backgroundColor: "#2D477C",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
export default function DetallePedidos() {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id } = useParams();

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/listOneVenta/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getDataList();
  }, [getDataList]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }

  const ValidateStatus = ({ value }) => {
    if (value === 0) {
      return "Pendiente";
    }
    if (value === 1) {
      return "Rechazado";
    }
    if (value === 2) {
      return "Enviado";
    }
    if (value === 3) {
      return "Entregado";
    }
    if (value === 4) {
      return "Preparando";
    }
  };

  const ValiadteMovi = ({ value }) => {
    if (value === 0) {
      return (
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
              <label>
                <OutdoorGrillIcon />
              </label>
              <div />
            </div>
            <div>
              <p>preparando pedido</p>
            </div>
          </div>
          <div>
            <div className="indicador">
              <label>
                <LocalShippingIcon />
              </label>
              <div />
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
            <div style={styles.flex}>
              <p>Cancelado</p>
            </div>
          </div>
        </div>
      );
    }
    if (value === 1) {
      return (
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
              <label style={styles.anvance}>
                <HandshakeIcon />
              </label>
              <div style={styles.anvance} />
            </div>
            <div>
              <p>Entregado</p>
            </div>
          </div>
          <div>
            <div className="indicador">
              <label style={styles.anvance}>
                <CancelIcon />
              </label>
            </div>
            <div style={styles.flex}>
              <p>Rechazado</p>
            </div>
          </div>
        </div>
      );
    }
    if (value === 2) {
      return (
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
            <div style={styles.flex}>
              <p>Rechazado</p>
            </div>
          </div>
        </div>
      );
    }
    if (value === 3) {
      return (
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
              <label style={styles.anvance}>
                <HandshakeIcon />
              </label>
              <div style={styles.anvance} />
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
            <div style={styles.flex}>
              <p>Rechazado</p>
            </div>
          </div>
        </div>
      );
    }
    if (value === 4) {
      return (
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
              <label>
                <LocalShippingIcon />
              </label>
              <div />
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
            <div style={styles.flex}>
              <p>Rechazado</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="conter-deta-pedi">
      <div className="head-deta-pedi">
        <div className="title-head-deta-pedi">
          <h5>PEDIDO</h5>
          <label># {data.id}</label>
        </div>
        <div>
          <label>{data.created_at}</label>
          <div className="flex">
            <Button
              style={{
                background: "#2D477C",
                width: "100%",
                color: "#fff",
              }}
            >
              <ValidateStatus value={data.status_venta} />
            </Button>
          </div>
        </div>
      </div>
      <div className="grid body-deta-pedi">
        <div className="targe-deta-pedi">
          <h6>Dirección</h6>
          <div>
            <label>{data.user_compra.toUpperCase()}</label>
          </div>
          <div>
            <label>{data.direccion.toUpperCase()}</label>
          </div>
          <div>
            <label>Colombia</label>
          </div>
        </div>
        <div className="targe-deta-pedi">
          <h6>Forma de pago</h6>
          <div>
            <label>EFECTIVO O TRANSACCIÓN</label>
            <br />
            <label>$ {data.Total_Pago.toLocaleString("es-CO")}</label>
          </div>
          <div>
            <label>Informaciones adicionales</label>
          </div>
        </div>
        <div className="targe-deta-pedi">
          <h6>Resumen</h6>
          <div className="">
            <label>Subtotal</label>
            <label>$ {data.Total_Pago.toLocaleString("es-CO")}</label>
          </div>
          <div>
            <label>Consto del envio</label>
            <label>$ 0.0</label>
          </div>
          <div>
            <label>Total</label>
            <label>$ {data.Total_Pago.toLocaleString("es-CO")}</label>
          </div>
        </div>
      </div>
      <ListProd id={id} />
      <div className="footer-deta-pedi">
        <div>
          <h6>Estado Del Pedido</h6>
        </div>
        <ValiadteMovi value={data.status_venta} />
      </div>
    </div>
  );
}
