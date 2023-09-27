import Grid from "@mui/material/Unstable_Grid2";
import ResponsiveGrid from "../../../../components/Dgrid";
import ProList from "./grid";
import { useParams } from "react-router-dom";
import Filter from "./filter";
import Header from "./Header";

export default function CategoryProduct() {
  const { id } = useParams();

  return (
    <div className="conter-home">
      <div className="header-pay">
        <Header />
      </div>
      <ResponsiveGrid>
        <Grid>
          <Filter />
        </Grid>
        <Grid>
          <ProList id={id} />
        </Grid>
      </ResponsiveGrid>
    </div>
  );
}
