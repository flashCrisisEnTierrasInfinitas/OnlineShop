import { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CFormInput, CSpinner } from "@coreui/react";
import isMountedRef from "../../../hooks/useRefMounted";
import axios from "axios";
import Icons from "./icons";

export default function DataTable({setKey, key,token}) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      width: 130,
      renderCell: (params) => (
        <p style={{ color: params.row.color }}>{params.row.name}</p>
      ),
    },
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
    {
      field: "state",
      headerName: "Estado",
      width: 220,
      renderCell: (params) => {
        const map = {
          0: {
            Text: "Activo",
            color: "green",
          },
          1: {
            Text: "Inactivo",
            color: "red",
          },
        };
        const { Text, color } = map[params.value];

        return <a style={{ color: color }}>{Text}</a>;
      },
    },
    {
      field: "created_at",
      headerName: "fecha",
      type: "Codigo",
      width: 90,
    },
    {
      field: "actions", // Nombre del campo
      headerName: "Acciones", // Nombre en la cabecera
      width: 130, // Ancho de la columna
      renderCell: (params) => <Icons data={params} setKey={setKey} key={key} token={token}/>,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/categoryProd`, {
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
  useEffect(() => {
    getDataList();
  }, [getDataList, key]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }

  const filteredData = data?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        setKey={setKey}
        key={key}
      />
    </div>
  );
}
