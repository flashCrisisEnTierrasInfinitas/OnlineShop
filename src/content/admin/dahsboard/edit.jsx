import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Typography from "@mui/joy/Typography";
import { Tooltip } from "@mui/joy";
import DataTable from "./table";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Factura from "../../pages/facturaPay";
import generatePDF from "react-to-pdf";
import {
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

import { useRef, useState } from "react";
import { Button } from "@mui/material";

export default function Edit({ data }) {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef();

  const Status = ({ data }) => {
    if (data == 0) {
      return (
        <input
          type="text"
          class="form-control top-20"
          value="sin entrega"
          disabled
        />
      );
    }
    if (data == 1) {
      return (
        <input
          type="text"
          class="form-control top-20"
          value="rechazado"
          disabled
        />
      );
    }
    if (data == 2) {
      return (
        <input
          type="text"
          class="form-control top-20"
          value="enviado"
          disabled
        />
      );
    }
    if (data == 3) {
      return (
        <input
          type="text"
          class="form-control top-20"
          value="entregado"
          disabled
        />
      );
    }
    if (data == 4) {
      return (
        <input
          type="text"
          class="form-control top-20"
          value="Preparando"
          disabled
        />
      );
    }
  };
  const Service = ({ data }) => {
    if (data == 0) {
      return (
        <input
          type="text"
          class="form-control top-20"
          value="Entregar"
          disabled
        />
      );
    }
    if (data == 1) {
      return (
        <input
          type="text"
          class="form-control top-20"
          value="Enviar"
          disabled
        />
      );
    }
  };

  return (
    <>
      <Tooltip title="Ver">
        <button className="btn" onClick={() => setVisible(true)}>
          <RemoveRedEyeIcon />
        </button>
      </Tooltip>
      <CModal
        size="xl"
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">
            <h2 className="title-ver-daly">Usuario: {data.user_compra}</h2>
            <h3 className="title-ver-daly color-gray">Codigo: {data.id}</h3>
            <h3 className="title-ver-daly color-gray">
              Fecha: {new Date(data.created_at).toLocaleString()}
            </h3>
            <Button
              variant="contained"
              onClick={() =>
                generatePDF(targetRef, {
                  filename:
                    data.id +
                    " " +
                    data.user_compra +
                    " " +
                    new Date(data.created_at).toLocaleString() +
                    ".pdf",
                })
              }
            >
              <PictureAsPdfIcon />
            </Button>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <div class="row top-50">
              <div class="col">
                <label htmlFor="">Estado Venta:</label>
                <Status data={data.status_venta} />
              </div>
              <div class="col">
                <label htmlFor="">Tipo Servicio:</label>
                <Service data={data.tipo_servicio} />
              </div>
              <div class="col-12 top-50">
                <Typography></Typography>
                <h2 className="title-ver-daly">Lista Producto:</h2>
                <DataTable id={data.id} />
              </div>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <div class="col-12">
            <div className="grid">
              <div>
                <h2 className="title-ver-daly top-50">Factura productos:</h2>
                <div className="margin-90" ref={targetRef}>
                  <Factura data={data} />
                </div>
              </div>
              <div>
                <h2 className="title-ver-daly top-50">Comprobante pago:</h2>
                <div className="img-pago">
                  <img
                    src={data.img}
                    alt="Sin Comprobante de pago rechazar la solicitud¡!"
                  />
                </div>
              </div>
            </div>
          </div>
        </CModalFooter>
      </CModal>
    </>
  );
}
