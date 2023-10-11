import Stack from "@mui/material/Stack";
import GppBadIcon from "@mui/icons-material/GppBad";
import SendIcon from "@mui/icons-material/Send";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Edit from "./edit";
import { Tooltip } from "@mui/material";

const data = [
  {
    id: 1,
    text: "Producto rechazado",
    user: "jhonma",
    codigo: "7",
    color: "#d32f2f",
  },
  {
    id: 2,
    text: "Sin entregar",
    user: "jhonma",
    codigo: "2",
    ico1: <DoneOutlineIcon />,
    ico: <SendIcon />,
    color: "#ed6c02",
  },
  {
    id: 3,
    text: "Entregado",
    user: "jhonma",
    codigo: "4",
    color: "#2e7d32",
  },
  {
    id: 4,
    text: "Enviado",
    user: "jhonma",
    ico1: <DoneOutlineIcon />,
    codigo: "3",
    color: "#0288d1",
  },
];

export default function Components() {
  return (
    <div className="conter-daly">
      <Stack sx={{ width: "100%" }} spacing={2}>
        {data.map((data) => (
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
                  <label>{data.codigo}</label>
                </div>
              </div>
              <div className="ico-daly">
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
    </div>
  );
}
