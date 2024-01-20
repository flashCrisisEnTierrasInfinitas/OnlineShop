import { CSpinner } from "@coreui/react";
import { Chip } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../../hooks/useRefMounted";

export default function ListProd({ id }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
    <div className="grid list-pro-deta-pedi">
      {data.map((data) => (
        <div className="target-list-deta-pedi" key={data.id}>
          <div>
            <img src={data.img} alt={data.nombrePro} />
          </div>
          <div>
            <label>{data.nombrePro}</label>
          </div>
          <div>
            <Chip label={data.cantidad} />
          </div>
          <div>
            <label>$ {data.precio.toLocaleString("es-CO")}</label>
          </div>
        </div>
      ))}
    </div>
  );
}
