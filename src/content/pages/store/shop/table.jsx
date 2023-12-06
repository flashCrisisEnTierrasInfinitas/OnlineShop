import { Button } from "@mui/material";

export default function Table({ data, Total }) {
  console.log("🚀 ~ file: table.jsx:2 ~ Table ~ data:", data);
  const dataToRender = data || [];

  const Totals = ({ product }) => {
    const { precioPro, quantity } = product;
    const total = precioPro * quantity;
    return total.toLocaleString("es-CO");
  };
  return (
    <div>
      {dataToRender.map((val) => (
        <div className="table-shop">
          <div className="nombre-shop">
            <div className="img-shop">
              <img src={val.img} alt={val.nombre} />
            </div>
            <div className="text-nombre-shop">
              <p>{val.descripPro}</p>
              <button>Quitar</button>
            </div>
          </div>
          <div className="nombre-shop">
            Precio: ${val.precioPro.toLocaleString("es-CO")}
          </div>
          <div className="nombre-shop">
            Cantidad:
            <input
              type="number"
              className="input-quantity"
              value={val.quantity}
            />
          </div>
          <div className="nombre-shop">
            Total: $<Totals product={val} />
          </div>
        </div>
      ))}
      <div className="grid top-50">
        <div></div>
        <div>
          <div className="info-shop">
            Subtotal: ${Total.toLocaleString("es-CO")}
          </div>
          <div className="info-shop">
            <label>
              En la pantalla de pagos se incluye el impuesto y se calculan los
              gastos de envío.
            </label>
          </div>
          <div className="grid">
            <a href="/">
              <Button
                style={{
                  background: "#2D477C",
                  width: "100%",
                  color: "#fff",
                }}
              >
                Seguir comprando
              </Button>
            </a>
            <Button
              style={{
                background: "#FF6333",
                width: "100%",
                color: "#fff",
              }}
            >
              Finalizar pedido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
