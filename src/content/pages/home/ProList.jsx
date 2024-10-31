import { CSpinner } from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import isMountedRef from "../../../hooks/useRefMounted";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import DefaultCarousel from "./slider2";
import Categorias from "./categorias";

export default function ProList({ total, setTotal }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([]);

  const [oferta, setOferta] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/listActiveProduct`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getDataList();
  }, [getDataList]);

  const getOfertaList = useCallback(async () => {
    try {
      const response = await axios.get(`/producOferta`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOferta(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getOfertaList();
  }, [getOfertaList]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }

  const Peso = ({ value }) => {
    if (value === "un") {
      return "Unidades";
    }
    if (value === "lb") {
      return "Libras";
    }
    if (value === "kg") {
      return "Kilos";
    }
    if (value === "g") {
      return "Gramos";
    }
    if (value === "arr") {
      return "Arroba";
    }
    if (value === "do") {
      return "docenas";
    }
    if (value === "lt") {
      return "Litros";
    }
  };

  const Presentacion = ({ value }) => {
    if (value === "un") {
      return "Unidades";
    }
    if (value === "cj") {
      return "Cajas";
    }
    if (value === "paq") {
      return "Paquetes";
    }
    if (value === "cube") {
      return "Cubeta";
    }
    if (value === "doce") {
      return "Docena";
    }
    if (value === "btl") {
      return "Bulto";
    }
    if (value === "can") {
      return "Canasta";
    }
    if (value === "bto") {
      return "Botella";
    }
  };

  const filteredData = data?.filter((item) =>
    item.nombrePro?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //!

  return (
    <div className="margin-90 conter-pro">
      <div>
        <Categorias />
        {/*<DefaultCarousel data={oferta} total={total} setTotal={setTotal} /> */}

        <div className="mt-20 mb-10" />
        <div class="bg-white flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
          <input
            type="email"
            placeholder="¿Qué estás buscando?"
            class="w-full outline-none bg-white pl-4 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            class="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
          >
            Search
          </button>
        </div>

        <div class="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <h2 class="text-4xl font-extrabold text-gray-800 mb-12">
            Nuestros Productos
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredData.map((product, index) => (
              <a
                key={index}
                href={`/DetalleProduc/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <div class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
                  <div class="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <img
                      src={product.img}
                      //src="https://coca-colafemsa.com/wp-content/uploads/2019/12/reflejo_pag1.png"
                      alt={product.nombrePro}
                      class="h-full w-full object-contain"
                    />
                  </div>

                  <div class="p-6 bg-white">
                    <h3 class="text-lg font-bold text-gray-800">
                      {product.nombrePro}
                    </h3>
                    <h4 class="text-lg text-gray-800 font-bold mt-2">
                      ${product.precioPro.toLocaleString("es-CO")}
                    </h4>
                    <p class="text-gray-600 text-sm mt-2">
                      Presentación,
                      <Presentacion value={product.Presentacion} />
                    </p>
                    <p class="text-gray-600 text-sm">
                      Cantidades, <Peso value={product.peso} />
                    </p>{" "}
                    <div class="flex space-x-2 mt-4">
                      <svg
                        class="w-4 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-4 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-4 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-4 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-4 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
