import ContedAdmin from "../components/Conter";
import Table from "./table";
import New from "./new";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function User() {
  var token = Cookies.get("token");
  return (
    <ContedAdmin>
      <h1 className="title-module">USUARIOS</h1>
      <div className="margin-90">
        <div className="botom-table">
          <Button variant="contained" startIcon={<CloudDownloadIcon />}>
            Download PDF
          </Button>
          <New token={token} />
        </div>
        <Table token={token} />
      </div>
    </ContedAdmin>
  );
}
