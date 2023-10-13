import { useState } from "react";
import ContedAdmin from "../components/Conter";
import New from "./new";
import TableMaterial from './tableMaterial';
import { Button } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Cookies from "js-cookie";

export default function Category() {

  const [key, setKey]= useState(0)
  var getToken = Cookies.get('token');

  return (
    <ContedAdmin>
      <h1 className="title-module">CATEGORIA PRODUCTOS</h1>
      <div className="margin-90">
        <div className="botom-table">
        <Button
            variant="contained"
            startIcon={<CloudDownloadIcon/>}
          >
            Download PDF
          </Button>
          <New token={getToken}/>
        </div>
        <TableMaterial  setKey={setKey} key={key} token={getToken}/>
      </div>
    </ContedAdmin>
  );
}
