import Stack from "@mui/material/Stack";
import GppBadIcon from "@mui/icons-material/GppBad";
import SendIcon from "@mui/icons-material/Send";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Edit from "./edit";
import { Tooltip, Chip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import isMountedRef from "../../../hooks/useRefMounted";
import { CSpinner } from "@coreui/react";

const data = [
  {
    id: 1,
    text: "Producto rechazado",
    user: "jhonma",
    describe: "1",
    codigo: "7",
    color: "#d32f2f",
  },
  {
    id: 2,
    text: "Sin entregar",
    describe: "2",
    user: "jhonma",
    codigo: "2",
    ico1: <DoneOutlineIcon />,
    ico: <SendIcon />,
    icoDele: <HighlightOffIcon />,
    color: "#ed6c02",
  },
  {
    id: 3,
    text: "Entregado",
    describe: "2",
    user: "jhonma",
    codigo: "4",
    color: "#2e7d32",
  },
  {
    id: 4,
    text: "Enviado",
    describe: "1",
    user: "jhonma",
    ico1: <DoneOutlineIcon />,
    icoDele: <HighlightOffIcon />,
    codigo: "3",
    color: "#0288d1",
  },
];

export default function Components() {


  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState([]);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/mydaly`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaW9ubGluZXNob3AuY29tLmFzdXByb2NvbG9tYmlhc2FzLmNvbS9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTY5NzE3NTg3OSwiZXhwIjoxNjk3MTc5NDc5LCJuYmYiOjE2OTcxNzU4NzksImp0aSI6ImxTOGpONE5Wcld3ZkZRNHMiLCJzdWIiOiI4IiwicHJ2IjoiNTg3MDg2M2Q0YTYyZDc5MTQ0M2ZhZjkzNmZjMzY4MDMxZDExMGM0ZiJ9.r9Jte4IbCBku73YLd3tyabW8UsUhJSVX4-XZjBloJ4g',
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
      {Error ? (<p>{Message}</p>) : (
        <Stack sx={{ width: "100%" }} spacing={2}>
          {filteredData.map((data) => (
            <div className="alerta" style={{ background: data.color }}>
              <div className="conter-alerta">
                <div className="ico-alerta">
                  <GppBadIcon />
                </div>
                <div className="text-alerta">
                  <strong>{data.text}</strong>
                  <div>
                    <label>Usuario:</label>
                    <label>{data.user}</label>
                  </div>
                  <div>
                    <label>codigo venta:</label>
                    <Chip label={data.codigo} color="secondary" />
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
          ))}
        </Stack>
      )}
    </div>
  );
}
