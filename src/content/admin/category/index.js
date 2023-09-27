import { useState } from "react";
import ContedAdmin from "../components/Conter";
import New from "./new";
import TableMaterial from './tableMaterial';
import { Button } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function Category() {

  const [key, setKey]= useState(0)

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
          <New />
        </div>
        <TableMaterial  setKey={setKey} key={key}/>
      </div>
    </ContedAdmin>
  );
}
