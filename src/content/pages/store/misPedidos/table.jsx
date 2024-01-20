import { Button, Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function Table({ data }) {
  const ValidateStatus = ({ values }) => {
    if (values === 0) {
      return (
        <Button
          style={{
            background: "#2D477C",
            width: "100%",
            color: "#fff",
          }}
        >
          Pendiente
        </Button>
      );
    }
    if (values === 1) {
      return (
        <Button
          style={{
            background: "#2D477C",
            width: "100%",
            color: "#fff",
          }}
        >
          Rechazado
        </Button>
      );
    }
    if (values === 2) {
      return (
        <Button
          style={{
            background: "#2D477C",
            width: "100%",
            color: "#fff",
          }}
        >
          Enviado
        </Button>
      );
    }
    if (values === 3) {
      return (
        <Button
          style={{
            background: "#2D477C",
            width: "100%",
            color: "#fff",
          }}
        >
          Entregado
        </Button>
      );
    }
    if (values === 4) {
      return (
        <Button
          style={{
            background: "#2D477C",
            width: "100%",
            color: "#fff",
          }}
        >
          Preparando producto
        </Button>
      );
    }
  };

  const ValidateService = ({ values }) => {
    if (values === 0) {
      return <Chip label="Recoger" />;
    } else {
      return <Chip label="Enviar" />;
    }
  };

  return (
    <div className="conter-table-pedidos">
      {data.map((data) => (
        <div className="table-pedidos">
          <div className="grid head-table-pedidos">
            <div>
              <h4>FECHA DEL PEDIDO</h4>
              <label className="parra-head-tab-pedi">
                {data.created_at.toLocaleString()}
              </label>
            </div>
            <div>
              <h4>TOTAL</h4>
              <label className="parra-head-tab-pedi">
                $ {data.Total_Pago.toLocaleString("es-CO")}
              </label>
            </div>
            <div className="status-table-pedidos">
              <div>
                <div>
                  <label className="parra-head-tab-pedi"># {data.id}</label>
                </div>
                <div>
                  <ValidateStatus values={data.status_venta} />
                </div>
              </div>
            </div>
          </div>
          <div className="grid body-table-pedidos">
            <div className="img-table-pedidos">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/026/434/409/small_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg" />
            </div>
            <div>
              <div>
                <ValidateService values={data.tipo_servicio} />
                <div className="info-body-tab-pedi">
                  <label className="title-info-tab-pedi">USUARIO</label>
                  <label>{data.user_compra}</label>
                </div>
              </div>
            </div>
            <div>
              <div className="title-body-tab-pedi">
                <PersonIcon />
                <label>{data.user_venta}</label>
              </div>
              <div>
                <Button
                  style={{
                    background: "#FF6333",
                    width: "100%",
                    color: "#fff",
                  }}
                >
                  ver detalles del pedido
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
