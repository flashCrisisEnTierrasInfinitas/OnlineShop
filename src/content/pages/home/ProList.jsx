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
  console.log("🚀 ~ file: ProList.jsx:29 ~ data:", data);

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
        <DefaultCarousel data={oferta} total={total} setTotal={setTotal} />
        <div className="conter-search top-50">
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            class="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <section class="flex items-center bg-gray-100">
          <div class="p-4 mx-auto">
            <div class="grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredData.map((product) => (
                <a
                  href={`/DetalleProduc/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div class="mt-56 bg-white rounded shadow dark:bg-gray-700">
                    <div class="relative z-20 p-6 group">
                      <div class="relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full ">
                        <img
                          class="object-cover w-full h-full transition-all group-hover:scale-110"
                          src={product.img}
                          srcSet={product.img}
                          loading="lazy"
                          alt={product.nombrePro}
                        />
                      </div>
                      <h2 class="mb-2 text-xl font-bold text-black dark:text-white">
                        {product.nombrePro}
                      </h2>
                      <p class="text-gray-500">
                        Presentación,{" "}
                        <Presentacion value={product.Presentacion} />
                      </p>
                      <p class="text-gray-500">
                        Categoria, {product.categorias}
                      </p>
                      <p class="text-gray-500">
                        Cantidades, <Peso value={product.peso} />
                      </p>
                      <p class="mb-3 text-lg font-bold text-blue-500 dark:text-blue-300 ">
                        <span>
                          {" "}
                          ${product.precioPro.toLocaleString("es-CO")}
                        </span>
                        <span class="text-xs font-semibold text-gray-400 line-through ">
                          ${product.precioPro.toLocaleString("es-CO")}
                        </span>
                      </p>
                      <div class="flex gap-1 text-orange-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-star"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
