import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useState } from "react";
import { Button, Input, Tooltip } from "@mui/joy";


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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 900,
            borderRadius: "md",
            p: 3,
          }}
          size="lg"
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Usuario: {data.user}
          </Typography>
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Codigo: {data.codigo}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="First name"
                  aria-label="First name"
                  value={data.text}
                  disabled
                />
              </div>
              <div class="col">
                <label class="visually-hidden" for="specificSizeSelect">
                  Preference
                </label>
                <select class="form-select" id="specificSizeSelect">
                  <option value="1">{data.text}</option>
                  <option value="2">Entregado</option>
                  <option value="3">Enviado</option>
                </select>
              </div>
            </div>
            <div class="col-12 top-50">
              <Button>Guardar</Button>
            </div>
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
}
