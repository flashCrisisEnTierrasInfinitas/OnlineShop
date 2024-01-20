import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import axios from "axios";
import { CSpinner } from "@coreui/react";
import Table from "./table";

export default function MisPediso({ Seccion }) {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log("🚀 ~ MisPediso ~ data:", data);

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
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }
  return (
    <div>
      <h1>Mis pedidos</h1>
      <div>
        <Table data={data} />
      </div>
    </div>
  );
}
