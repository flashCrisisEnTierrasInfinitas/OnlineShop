import React, { useCallback, useEffect, useState } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CContainer,
  CCard,
  CCardBody,
  CAlert,
  CButton,
  CFormInput,
  CSpinner,
} from "@coreui/react";
import isMountedRef from "../../../../hooks/useRefMounted";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";


const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombrePro", headerName: "nombre", width: 330 },
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
    field: "precio",
    headerName: "precio",
    type: "Codigo",
    width: 90,
  },
  {
    field: "cantidad",
    headerName: "cantidad",
    type: "Codigo",
    width: 90,
  },
  {
    field: "Total_Pago",
    headerName: "Total_Pago",
    type: "Codigo",
    width: 90,
  },
  {
    field: "created_at",
    headerName: "fecha",
    type: "Codigo",
    width: 140,
  }
];
;

export default function Table({seccion,token}) {
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.post(`/ventasProductos/${seccion}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + token,
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
    <div className="conter-table">
      <div className="conter-search top-50">
        <CFormInput
          placeholder="¿Qué estás buscando?"
          className="input-search"
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
