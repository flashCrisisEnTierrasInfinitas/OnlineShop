import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Modal from "@mui/joy/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useState } from "react";
import { Tooltip, ModalOverflow } from "@mui/joy";
import DataTable from "./table";
import ModalClose from "@mui/joy/ModalClose";

export default function Edit({ data }) {
  const [open, setOpen] = useState(false);

  const Status = ({ data }) => {

    if (data == 0) {
      return (
        <input
          type="text"
          class="form-control"
          value='sin entrega'
          disabled
        />);
    } if (data == 1) {
      return (
        <input
          type="text"
          class="form-control"
          value='rechazado'
          disabled
        />);
    }
    if (data == 2) {
      return (
        <input
          type="text"
          class="form-control"
          value='enviado'
          disabled
        />);
    }
    if (data == 3) {
      return (
        <input
          type="text"
          class="form-control"
          value='entregado'
          disabled
        />);
    }
  }
  const Service = ({ data }) => {
    if (data == 0) {
      return (
        <input
          type="text"
          class="form-control"
          value='Entregar'
          disabled
        />
      )
    } if (data == 1) {
      return (
        <input
          type="text"
          class="form-control"
          value='Enviar'
          disabled
        />
      )
    }
  }

  return (
    <>
      <Tooltip title="Ver">
        <button className="btn" onClick={() => setOpen(true)}>
          <RemoveRedEyeIcon />
        </button>
      </Tooltip>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          maxWidth: 900,
          margin: "0 auto"
        }}
      >
        <div className="edit-modal">
          <ModalOverflow>
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: "md",
                p: 3,
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <h2 className="title-ver-daly">Usuario: {data.user_compra}</h2>
              <h3 className="title-ver-daly color-gray">
                Codigo: {data.id}
              </h3>
              <h3 className="title-ver-daly color-gray">
                Fecha: {data.created_at}
              </h3>
              <Typography id="modal-desc" textColor="text.tertiary">
                <div class="row">
                  <div class="col">
                    <Status data={data.status_venta} />
                  </div>
                  <div class="col">
                    <Service data={data.tipo_servicio} />
                  </div>
                  <div class="col-12 top-50">
                    <Typography></Typography>
                    <h2 className="title-ver-daly">Lista Producto:</h2>
                    <DataTable id={data.id}/>
                  </div>
                </div>
                <div class="col-12">
                  <br />
                  <br />
                  <h2 className="title-ver-daly top-50">Comprobante pago:</h2>
                  <div className="img-pago">
                    <img
                      src={data.img}
                      alt='Sin Comprobante de pago rechazar la solicitud¡!'
                    />
                  </div>
                </div>
              </Typography>
            </Sheet>
          </ModalOverflow>
        </div>
      </Modal>
    </>
  );
}
