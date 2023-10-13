import { Button } from "@mui/material";
import ContedAdmin from "../components/Conter";
import New from "./new";
import TableMaterial from "./tableMaterial";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Cookies from "js-cookie";

export default function Product() {
  var token = Cookies.get('token');
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
          <New token={token}/>
        </div>
        <TableMaterial token={token}/>
      </div>
    </ContedAdmin>
  );
}
