import { CSpinner } from "@coreui/react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Progres from "./progres";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Pay({ setTotal, Seccion, addShop, setAddShop }) {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var direccion = Cookies.get("direccion");
  var user_telefono = Cookies.get("user_telefono");
  var tipo_servicio = Cookies.get("tipo_servicio");
  var getToken = Cookies.get("token");

  const eliminarCookie = () => {
    Cookies.remove("direccion");
    Cookies.remove("user_telefono");
    Cookies.remove("tipo_servicio");
    localStorage.removeItem("addShop");
    localStorage.removeItem("Total");
  };

  const [formData, setFormData] = useState({
    user_venta: "Admin",
    user_compra: Seccion,
    direccion: direccion,
    user_telefono: user_telefono,
    tipo_servicio: tipo_servicio,
    img: image,
    productos: addShop.map((producto) => ({
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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async () => {
    if (
      !formData.direccion ||
      !formData.user_telefono ||
      !formData.tipo_servicio ||
      !formData.productos
    ) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Faltan campos!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    try {
      setLoading(true);
      const response = await axios.post("/ventas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + getToken,
        },
      });
      setLoading(false);
      setAddShop([]);
      setTotal(0);
      await eliminarCookie();
      window.location.reload();
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
    <div className="top-20">
      <Progres />
      <section class="py-16 bg-gray-100">
        <div class="max-w-6xl px-4 mx-auto">
          <div class="rounded-lg shadow bg-gray-50 dark:border-gray-900">
            <div class="p-6 ">
              <div class="pb-6 border-b border-gray-100">
                <h2 class="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                  Metodo de Pago
                </h2>
              </div>
              <div class="py-6 border-b border-gray-100">
                <div class="w-full md:w-10/12">
                  <div class="flex flex-wrap mb-2 -m-3">
                    <div class="w-full p-3 md:flex-1">
                      <p class="mb-1.5 font-medium text-base text-gray-800 dark:text-gray-400">
                        Usuario
                      </p>
                      <input
                        class="w-full  dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                        type="text"
                        value={Seccion}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-10/12">
                  <div class="flex flex-wrap mb-2 -m-3">
                    <div class="w-full p-3 md:flex-1">
                      <p class="mb-1.5 font-medium text-base text-gray-800 dark:text-gray-400">
                        Direccion
                      </p>
                      <input
                        class="w-full  dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                        type="text"
                        value={formData.direccion}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-10/12">
                  <div class="flex flex-wrap mb-2 -m-3">
                    <div class="w-full p-3 md:flex-1">
                      <p class="mb-1.5 font-medium text-base text-gray-800 dark:text-gray-400">
                        Telefono
                      </p>
                      <input
                        class="w-full  dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                        type="text"
                        value={formData.user_telefono}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-10/12">
                  <div class="flex flex-wrap mb-2 -m-3">
                    <div class="w-full p-3 md:flex-1">
                      <p class="mb-1.5 font-medium text-base text-gray-800 dark:text-gray-400">
                        Tipo de Entrega
                      </p>

                      <input
                        class="w-full  dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                        type="text"
                        value={
                          formData.tipo_servicio == 1 ? "enviar" : "recoger"
                        }
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Nequi" {...a11yProps(0)} />
                    <Tab label="DaviPlata" {...a11yProps(1)} />
                    <Tab label="Efectivo" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div class="flex flex-wrap max-w-5xl mx-auto -m-3">
                    <div class="w-full md:w-1/2 lg:w-1/4 p-3">
                      <div class="flex items-center justify-center py-8 px-9 h-full bg-white rounded-3xl">
                        <img
                          src="https://www.elnuevodia.com.co/nuevodia/sites/default/files/inline-images/32%20_0.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <p class="mb-14 text-sm text-gray-600 text-center font-semibold uppercase tracking-px">
                    Paga por Nequi al telefono:57 310 2055841
                  </p>
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 "
                    for="file_input"
                  >
                    Cargar Comprobante
                  </label>
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div class="flex flex-wrap max-w-5xl mx-auto -m-3">
                    <div class="w-full md:w-1/2 lg:w-1/4 p-3">
                      <div class="flex items-center justify-center py-8 px-9 h-full bg-white rounded-3xl">
                        <img
                          src="https://cdn.worldvectorlogo.com/logos/daviplata.svg"
                          alt="logo daviplata"
                        />
                      </div>
                    </div>
                  </div>
                  <p class="mb-14 text-sm text-gray-600 text-center font-semibold uppercase tracking-px">
                    Paga por daviPlata al telefono:57 310 2055841
                  </p>
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 "
                    for="file_input"
                  >
                    Cargar Comprobante
                  </label>
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <div class="flex flex-wrap max-w-5xl mx-auto -m-3">
                    <div class="w-full md:w-1/2 lg:w-1/4 p-3">
                      <div class="flex items-center justify-center py-8 px-9 h-full bg-white rounded-3xl">
                        <img
                          src="https://cdn.worldvectorlogo.com/logos/pago-efectivo-2020.svg"
                          alt="logo daviplata"
                        />
                      </div>
                    </div>
                  </div>
                  <p class="mb-14 text-sm text-gray-600 text-center font-semibold uppercase tracking-px">
                    Paga en Efectivo en nuestras tiendas
                  </p>
                </CustomTabPanel>
              </Box>
            </div>
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
                  "finalizar compra"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
