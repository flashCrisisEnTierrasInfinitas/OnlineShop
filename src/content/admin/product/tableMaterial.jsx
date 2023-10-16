import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CFormInput, CSpinner } from "@coreui/react";
import isMountedRef from "../../../hooks/useRefMounted";
import axios from "axios";
import Icons from "./icons";
import { Chip } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombrePro", headerName: "Nombre", width: 230 },
  {
    field: "img",
    headerName: "img",
    width: 90,
    renderCell: (params) => (
      <img
        src={params.row.img}
        alt={params.row.nombrePro}
        className="img-table"
      />
    ),
  },
  { field: "descripPro", headerName: "Descripción", width: 220 },
  {
    field: "codigoPro",
    headerName: "Age",
    type: "Codigo",
    width: 90,
  },
  {
    field: "status", // Nombre del campo
    headerName: "status", // Nombre en la cabecera
    width: 100, // Ancho de la columna
    renderCell: (params) => (
      params.row.status == 0 ? (
        <p style={{color:'green'}}>Activo</p>
      ) : (<p style={{color:'red'}}>Inactivo</p>)
    ),
  },
  {
    field: "oferta", // Nombre del campo
    headerName: "oferta", // Nombre en la cabecera
    width: 100, // Ancho de la columna
    renderCell: (params) => (
      params.row.oferta == 0 ? (
        <Chip label="NO" color="primary" />
      ) : (<Chip label="SI" color="error" />)
    ),
  },
  {
    field: "name",
    headerName: "Categoria",
    width: 130,
    renderCell: (params) => (
      <p style={{ color: params.row.color }}>{params.row.name}</p>
    ),
  },
  { field: "created_at", headerName: "Fecha", width: 130 },
  { field: "precioPro", headerName: "Precio", width: 130 },
  { field: "stockPro", headerName: "Stock", width: 10 },
  {
    field: "actions", // Nombre del campo
    headerName: "Acciones", // Nombre en la cabecera
    width: 130, // Ancho de la columna
    renderCell: (params) => <Icons data={params} />,
  },
];

export default function DataTable() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const getDataList = React.useCallback(async () => {
    try {
      const response = await axios.get(`/product`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [isMountedRef]);
  React.useEffect(() => {
    getDataList();
  }, [getDataList]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }

  const filteredData = data?.filter((item) => {
    // Convierte cada valor del objeto en una cadena y verifica si contiene el término de búsqueda
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const value = item[key];
        if (
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true; // Si alguna propiedad contiene el término de búsqueda, se incluye en los resultados
        }
      }
    }
    return false;
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div className="conter-search">
        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          class="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <DataGrid
        columns={columns}
        rows={filteredData}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
