import { CFormLabel, CFormSelect, CSpinner } from "@coreui/react";
import { Alert, Button, Chip } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function Form({ Seccion, token, setAddShop, setTotal, Total }) {
  const [image, setImage] = useState(null);
  const [require, setRequire] = useState(true);
  const data = localStorage.getItem("addShop");
  const productos = JSON.parse(data);
  const valueToDisplay = Total ? Total.toLocaleString() : "";

  const [formData, setFormData] = useState({
    user_venta: "Admin",
    user_compra: Seccion,
    direccion: "",
    user_telefono: "",
    tipo_servicio: "",
  });

  const Info = () => {
    Cookies.set("direccion", formData.direccion, { expires: 1 });
    Cookies.set("user_telefono", formData.user_telefono, { expires: 1 });
    Cookies.set("tipo_servicio", formData.tipo_servicio, { expires: 1 });
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
      return setRequire(false);
    } else {
      await Info();
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
              <form
                className="form-sale"
                action="/UO17GnzSbb3aAELCedxp/sa0gKSig+a2WVdeggeZbWcPcbXYmohwaT+NQYcilQ93"
              >
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
                    required
                  />
                </div>
              </form>
              {require ? (
                ""
              ) : (
                <div
                  class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">
                      Todos los campos son requeridos!
                    </span>
                  </div>
                </div>
              )}

              <div class="flex pt-6 flex-wrap -m-1.5">
                <Button
                  type=""
                  onClick={handleSubmit}
                  style={{
                    background: "#FF6333",
                    width: "100%",
                    color: "#fff",
                  }}
                >
                  continuar pedido
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
