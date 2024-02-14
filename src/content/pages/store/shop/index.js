import Table from "./table";
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

export default function Shop({
  Seccion,
  Total,
  setTotal,
  setAddShop,
  addShop,
}) {
  const datas = localStorage.getItem("addShop");
  const productos = JSON.parse(datas);

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
            <label>
              <AddCardIcon />
            </label>
            <div />
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
      <div>
        <h2>COMPRAS</h2>
      </div>
      <Table
        data={productos}
        Total={Total}
        setTotal={setTotal}
        setAddShop={setAddShop}
        addShop={addShop}
      />
    </div>
  );
}
