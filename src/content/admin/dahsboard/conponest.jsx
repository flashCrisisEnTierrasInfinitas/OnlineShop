import Stack from "@mui/material/Stack";
import GppBadIcon from "@mui/icons-material/GppBad";
import Edit from "./edit";
import { Tooltip, Chip, Alert } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import isMountedRef from "../../../hooks/useRefMounted";
import { CSpinner } from "@coreui/react";
import Cookies from "js-cookie";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SendIcon from '@mui/icons-material/Send';
import Alertas from "./alerta";


export default function Components() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState([]);
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
  }, [getDataList]);

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
    return itemId.includes(searchTermLower);
  });


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
          <Stack sx={{ width: "100%" }} spacing={2}>
            {filteredData && filteredData.length > 0 ? (
              filteredData?.map((data) => (
                <Alertas data={data} />
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
