import { CFormLabel, CFormSelect, CSpinner } from "@coreui/react";
import { Alert, Button, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Form({ Seccion, token, setAddShop, setTotal, Total }) {
  const [expanded, setExpanded] = useState("panel1");
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = localStorage.getItem("addShop");
  const productos = JSON.parse(data);
  const valueToDisplay = Total ? Total.toLocaleString() : "";

  const [formData, setFormData] = useState({
    user_venta: "Admin",
    user_compra: Seccion,
    direccion: "",
    user_telefono: "",
    tipo_servicio: "",
    img: image,
    productos: productos.map((producto) => ({
      id: producto.id,
      cantidad: producto.quantity,
    })),
  });

  useEffect(() => {
    setFormData({
      ...formData,
      img: image || "",
    });
  }, [image]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.direccion | !formData.user_telefono ||
      !formData.tipo_servicio
    ) {
      return setOpen(true);
    }
    try {
      setLoading(true);
      const response = await axios.post("/ventas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + token,
        },
      });
      setLoading(false);
      setAddShop([]);
      setTotal(0);
      return Swal.fire({
        position: "center",
        icon: "info",
        title: "Su informacion,sera validada,para el respectivo envio!!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setLoading(false);
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "error al enviar los datos!!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="grid">
      <div style={{ background: "#F9F9F9", padding: "5px" }}>
        <div className="margin-90 list-sale">
          {productos.map((data) => (
            <div className="Conter-sale grid">
              <div>
                <div>
                  <img src={data.img} />
                </div>
                <span>{data.quantity}</span>
              </div>
              <div>
                <p>{data.descripPro}</p>
              </div>
              <div>
                <p>SubTotal:</p>
                <p>${data.precioPro}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="margin-90 grid">
          <div className="top-20">
            <label>Total:</label>
          </div>
          <div className="top-20">
            COL <label>${valueToDisplay}</label>
          </div>
          <div className="top-20">
            + $2.000 <label>De envió</label>
          </div>
        </div>
      </div>
      <div>
        <form className="form-sale">
          <CFormLabel>Tipo de Entrega</CFormLabel>
          <CFormSelect
            name="tipo_servicio"
            value={formData.tipo_servicio}
            onChange={handleChanges}
          >
            <option>Seleccione Servicio...</option>
            <option value={1}>Envio</option>
            <option value={0}>Recoger</option>
          </CFormSelect>
          <div></div>
          <div>
            <input
              type="text"
              placeholder="Dirección completa (Calle, No. Exterior, No. Interior)"
              class="form-control"
              name="direccion"
              value={formData.direccion}
              onChange={handleChanges}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Numero de telefono"
              class="form-control"
              name="user_telefono"
              value={formData.user_telefono}
              onChange={handleChanges}
            />
          </div>
          <div>
            {open ? (
              <Alert severity="error">Todos los campos son requeridos.</Alert>
            ) : (
              ""
            )}
          </div>
          <div className="top-50">
            <CFormLabel>Pagos</CFormLabel>
          </div>
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>Checkout de Pago, nequi o daviplata</div>
                    <div className="img-checkout-pago">
                      <div>
                        {" "}
                        <img src="/img/daviplata.svg" />
                      </div>
                      <div>
                        {" "}
                        <img src="/img/nequi-2.svg" />
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div>
                    Para proceder con el pago, consigne el monto total de su
                    compra al número de cuenta:{" "}
                    <span
                      style={{
                        color: "#FF6333",
                      }}
                    >
                      311533906{" "}
                    </span>{" "}
                    su monto total es:{" "}
                    <span
                      style={{
                        color: "#FF6333",
                      }}
                    >
                      ${valueToDisplay}
                    </span>
                  </div>
                  <div>
                    Puedes hacer tu transferencia a través de nuestros dos
                    métodos de pago, toma captura del pago y súbelo en este
                    recuadro¡!
                  </div>
                  <div>
                    <div className="box-file">
                      <div className="drag-file-area">
                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                        <p>Arrastra y suelta cualquier archivo aquí</p>
                        <input
                          type="file"
                          id="fileInput"
                          class="custom-file-input"
                          name="featured"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <label
                          for="fileInput"
                          class="custom-file-label"
                        ></label>
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography>Pago en efectivo a la entrega</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Paga en efectivo cuando entreguemos tu pedido en el domicilio
                  seleccionado (sólo para entregas, tu total es: $
                  {valueToDisplay})
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </form>
        <div className="top-50">
          <Button
            onClick={handleSubmit}
            style={{
              background: "#FF6333",
              width: "100%",
              color: "#fff",
            }}
          >
            {loading ? (
              <div className="progess">
                <CSpinner
                  color="light"
                  size="sm"
                  style={{ width: "1rem", height: "1rem" }}
                />
              </div>
            ) : (
              "Finalizar el Pedido"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
