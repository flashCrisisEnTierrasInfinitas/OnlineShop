import { Breadcrumbs, Typography } from "@mui/material";
import Form from "./form";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AddCardIcon from "@mui/icons-material/AddCard";
const styles = {
  anvance: {
    backgroundColor: "#2D477C",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default function Sale({
  Seccion,
  token,
  setAddShop,
  setTotal,
  Total,
  addShop,
}) {
  return (
    <div className="conter-detallepro margin-90">
      <div className="grid avances-deta-pedi">
        <div>
          <div className="indicador">
            <label style={styles.anvance}>
              <ShoppingCartIcon />
            </label>
            <div style={styles.anvance} />
          </div>
        </div>
        <div>
          <div className="indicador">
            <label style={styles.anvance}>
              <AddCardIcon />
            </label>
            <div style={styles.anvance} />
          </div>
        </div>
        <div>
          <div className="indicador">
            <label>
              <PublishedWithChangesIcon />
            </label>
          </div>
        </div>{" "}
      </div>
      <div className="flex">
        <h3 className="color-gray">Pantalla de pagos</h3>
      </div>
      <div className="margin-90">
        <Form
          Seccion={Seccion}
          token={token}
          setAddShop={setAddShop}
          setTotal={setTotal}
          Total={Total}
          addShop={addShop}
        />
      </div>
    </div>
  );
}
