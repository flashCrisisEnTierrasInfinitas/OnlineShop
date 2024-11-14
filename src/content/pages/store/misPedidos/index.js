import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import axios from "axios";
import { CSpinner } from "@coreui/react";
import Table from "./table";
import { Alert, Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import Loader from "../../../../components/loader";

export default function MisPediso({ Seccion }) {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/ventas/${Seccion}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + token,
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
    return <Loader />;
  }
  return (
    <div>
      <div
        style={{
          margin: "20px",
        }}
      >
        <a href="/">
          {" "}
          <Button variant="outlined" startIcon={<UndoIcon />}>
            regresar a la tienda
          </Button>
        </a>
      </div>
      <h1
        className="top-20"
        style={{
          textAlign: "center",
        }}
      >
        Mis pedidos
      </h1>
      {data && data.length > 0 ? (
        <div>
          <Table data={data} />
        </div>
      ) : (
        <Alert
          variant="filled"
          severity="info"
          style={{
            margin: "20px",
            background: "#2D477C",
          }}
        >
          No Tiene Pedidos.
        </Alert>
      )}
    </div>
  );
}
