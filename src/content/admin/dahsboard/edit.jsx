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
          margin:"0 auto"
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
              <h2 className="title-ver-daly">Usuario: {data.user}</h2>
              <h2 className="title-ver-daly color-gray">
                Codigo: {data.codigo}
              </h2>
              <Typography id="modal-desc" textColor="text.tertiary">
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      value={data.text}
                      disabled
                    />
                  </div>
                  <div class="col-12 top-50">
                    <Typography></Typography>
                    <h2 className="title-ver-daly">Lista Producto:</h2>
                    <DataTable />
                  </div>
                </div>
                <div class="col-12">
                  <br />
                  <br />
                  <h2 className="title-ver-daly top-50">Comprobante pago:</h2>
                  <div className="img-pago">
                    <img
                      src="https://storage.googleapis.com/support-forums-api/attachment/thread-181250426-10933702374541799356.jpg"
                      alt={data.user}
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
