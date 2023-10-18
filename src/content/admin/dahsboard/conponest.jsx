import Stack from "@mui/material/Stack";
import { Tooltip, Chip, Alert, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import isMountedRef from "../../../hooks/useRefMounted";
import { CSpinner } from "@coreui/react";
import Cookies from "js-cookie";
import Alertas from "./alerta";
import Toast from "./toast";


export default function Components() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState([]);
  const [statusVen, setStatusVen] = useState(0);
  var getToken = Cookies.get('token');

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/ventas`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + getToken,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage(error.response.data.message)
      setLoading(false);
      setError(true)
    }
  }, [isMountedRef]);
  useEffect(() => {
    getDataList();
  }, [statusVen]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }


  const filteredData = data?.filter((item) => {
    const itemId = String(item.id); // Asegura que item.id sea una cadena
    const searchTermLower = searchTerm.toLowerCase(); // Convierte la búsqueda a minúsculas
   
    return (
      itemId.includes(searchTermLower) && (item.status_venta === statusVen)
    );
    
  });

  const haldeClikStatus = async (id) => {
    setStatusVen(id);
  }
  return (

    <div className="conter-daly">
      {Error ? (<Alert variant="filled" severity="error">
        {Message}
      </Alert>) : (
        <>
          <div className="conter-search">
            <input
              type="text"
              placeholder="Busca por N° venta! ej:10"
              class="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="boton-product">
            <Button variant="contained" color="warning" onClick={() => haldeClikStatus(0)}>Nuevos</Button>
            <Button variant="contained" color="info" onClick={() => haldeClikStatus(2)}>Enviados</Button>
            <Button variant="contained" color="success" onClick={() => haldeClikStatus(3)}>Entregados</Button>
            <Button variant="contained" color="error" onClick={() => haldeClikStatus(1)}>Cancelados</Button>
          </div>
          <br />
          <Stack sx={{ width: "100%" }} spacing={2}>
            {filteredData && filteredData.length > 0 ? (
              filteredData?.map((data) => (
                <Alertas data={data} getDataList={getDataList} />
              ))
            ) : (<p><Alert variant="filled" severity="info">
              No Rows!!
            </Alert></p>)}

          </Stack>
        </>
      )}
    </div>
  );
}
