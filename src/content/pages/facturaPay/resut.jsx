import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { CSpinner } from "@coreui/react";
import isMountedRef from "../../../hooks/useRefMounted";
import { Chip } from "@mui/material";

export default function Result({ id }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: resut.jsx:9 ~ Result ~ data:", data);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/ventasProductos/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getDataList();
  }, [getDataList]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }

  return (
    <>
      {data.map((data) => (
        <>
          <div className="produc-factura">
            <div style={{ display: "flex" }}>
              <p className="flex">
                <i class="fa fa-balance-scale" aria-hidden="true" />-
                <Chip label={data.cantidad} color="primary" />
              </p>
              <p>{data.nombrePro}</p>
            </div>
            <div className="precio-pro-fac">
              <p>${data.precio.toLocaleString("es-CO")}</p>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
