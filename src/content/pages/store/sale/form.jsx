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
      return alert("Faltan campos del formulario!");
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
      <div>
        <section class="py-16 bg-gray-100">
          <div class="max-w-6xl px-2">
            <div class="p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-gray-900 dark:border-gray-900">
              <div class="pb-6 border-b border-gray-100">
                <h2 class="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                  Informacion pedido
                </h2>
                <p class="text-xs font-medium text-gray-500">
                  Complete toda la informacion requeridad.
                </p>
              </div>
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
              </form>
              <div class="flex pt-6 flex-wrap -m-1.5">
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
                    "continuar pedido"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <div class="p-6 bg-white md:pb-6 md:px-12 dark:bg-gray-800">
          <div class="flex items-center mb-10">
            <h2 class="font-bold dark:text-gray-400 ">Resumen Compra</h2>
          </div>
          {productos.map((data) => (
            <div class="block pb-6 mb-6 -mx-4 border-b border-gray-200 dark:border-gray-700 md:flex">
              <div class="w-full px-4 mb-6 md:w-1/3 md:mb-0">
                <div class="flex w-full h-96 md:h-32 md:w-32">
                  <img
                    src={data.img}
                    alt={data.nombrePro}
                    class="object-cover w-full h-full rounded-md"
                  />
                </div>
              </div>
              <div class="w-full px-4 md:2/3">
                <div class="flex justify-between">
                  <div class="">
                    <h2 class="mb-2 text-xl font-bold dark:text-gray-400">
                      {data.nombrePro}
                    </h2>
                    <p class="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400 ">
                      {" "}
                      Quantity: {data.quantity}
                    </p>
                  </div>
                  <div>
                    <p class="text-lg font-bold text-blue-500 dark:text-gray-400">
                      ${data.precioPro}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div class="flex justify-between text-base dark:text-gray-400">
            <p>Total</p>
            <p> COL${valueToDisplay.toLocaleString("es-CO")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
