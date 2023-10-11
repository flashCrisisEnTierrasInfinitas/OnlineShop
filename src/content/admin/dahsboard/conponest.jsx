import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import GppBadIcon from "@mui/icons-material/GppBad";

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
                <EditIcon />
              </div>
            </div>
          </div>
        ))}
      </Stack>
    </div>
  );
}
