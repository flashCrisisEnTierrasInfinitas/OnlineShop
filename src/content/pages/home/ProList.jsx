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
        <div className="box-vendido top-50">
          {filteredData?.map((product) => (
            <div className="card-pro-list">
              <a
                href={`/DetalleProduc/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card key={product.id}>
                  <AspectRatio>
                    <img
                      src={product.img}
                      srcSet={product.img}
                      loading="lazy"
                      alt={product.nombrePro}
                    />
                  </AspectRatio>
                  <div className="grid">
                    <div className="text-product">
                      <Typography fontSize="lg" fontWeight="lg">
                        {product.descripPro.toUpperCase()}
                      </Typography>
                      <Typography fontSize="lg" level="body-xs">
                        {product.nombrePro}
                      </Typography>
                      <Typography fontSize="lg" level="body-xs">
                        Categoria: {product.categorias}
                      </Typography>
                      <Typography fontSize="lg" level="body-xs">
                        Cantidades: <Peso value={product.peso} />
                      </Typography>
                      <Typography fontSize="lg" level="body-xs">
                        Presentación:{" "}
                        <Presentacion value={product.Presentacion} />
                      </Typography>
                    </div>
                    <div className="text-precio">
                      <label>
                        ${product.precioPro.toLocaleString("es-CO")}
                      </label>
                      <label>IVA INCLUIDO</label>
                    </div>
                  </div>
                </Card>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
