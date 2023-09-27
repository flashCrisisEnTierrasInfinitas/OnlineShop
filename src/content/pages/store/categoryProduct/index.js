import Grid from "@mui/material/Unstable_Grid2";
import ResponsiveGrid from "../../../../components/Dgrid";
import ProList from "./grid";
import { useParams } from "react-router-dom";

export default function CategoryProduct() {

  const { id } = useParams();

  return (
    <div className="conter-home">
      <div className="header-pay">
        <h1>carnes{id}</h1>
      </div>
      <ResponsiveGrid>
        <Grid>pollo</Grid>
        <Grid>
          <ProList />
        </Grid>
      </ResponsiveGrid>
    </div>
  );
}
