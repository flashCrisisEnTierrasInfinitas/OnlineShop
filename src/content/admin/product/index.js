import { Button } from "@mui/material";
import ContedAdmin from "../components/Conter";
import New from "./new";
import TableMaterial from "./tableMaterial";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function Product() {
  return (
    <ContedAdmin>
      <h1 className="title-module">LISTA PRODUCTOS</h1>
      <div className="margin-90">
        <div className="botom-table">
          <Button
            variant="contained"
            startIcon={<CloudDownloadIcon/>}
          >
            Download PDF
          </Button>
          <New />
        </div>
        <TableMaterial />
      </div>
    </ContedAdmin>
  );
}
