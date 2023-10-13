import Stack from "@mui/material/Stack";
import GppBadIcon from "@mui/icons-material/GppBad";
import Edit from "./edit";
import { Tooltip, Chip, Alert } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import isMountedRef from "../../../hooks/useRefMounted";
import { CSpinner } from "@coreui/react";
import Cookies from "js-cookie";


export default function Components() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState([]);
  var getToken = Cookies.get('token');

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/mydaly`, {
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
    // Convierte cada valor del objeto en una cadena y verifica si contiene el término de búsqueda
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const value = item[key];
        if (
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true; // Si alguna propiedad contiene el término de búsqueda, se incluye en los resultados
        }
      }
    }
    return false;
  });

  const TypeService = ({ data }) => {
    const map = {
      1: {
        text: "Entrega",
        color: "success",
      },
      3: {
        text: "Envio",
        color: "primary",
      },
    };
    const { text, color } = map[data];
    return <Chip label={text} color={color} />;
  };

  return (

    <div className="conter-daly">
      {Error ? (<Alert variant="filled" severity="error">
        {Message}
      </Alert>) : (
        <Stack sx={{ width: "100%" }} spacing={2}>
          {filteredData && filteredData.length > 0 ? (
            filteredData?.map((data) => (
              <div className="alerta" style={{ background: data.color }}>
                <div className="conter-alerta">
                  <div className="ico-alerta">
                    <GppBadIcon />
                  </div>
                  <div className="text-alerta">
                    <strong>{data.text}</strong>
                    <div>
                      <label>Usuario:</label>
                      <label>{data.Com_usuario}</label>
                    </div>
                    <div>
                      <label>codigo venta:</label>
                      <Chip label={data.Codigo_ven} color="secondary" />
                    </div>
                    <div>
                      <label>Tipo Servicio:</label>
                      <TypeService data={data.TypeService} />
                    </div>
                  </div>
                  <div className="ico-daly">
                    <Tooltip title="Cancelar">
                      <button className="btn">{data.icoDele}</button>
                    </Tooltip>
                    <Tooltip title="Entregar">
                      <button className="btn">{data.ico1}</button>
                    </Tooltip>
                    <Tooltip title="Enviar">
                      <button className="btn">{data.ico}</button>
                    </Tooltip>
                    <Edit data={data} />
                  </div>
                </div>
              </div>
            ))
          ) : (<p><Alert variant="filled" severity="info">
            No Rows!!
          </Alert></p>)}

        </Stack>
      )}
    </div>
  );
}
