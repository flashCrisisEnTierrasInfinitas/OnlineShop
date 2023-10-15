import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CSpinner } from "@coreui/react";
import isMountedRef from "../../../hooks/useRefMounted";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombrePro", headerName: "Nombre", width: 130 },
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
  { field: "codigoPro", headerName: "Codigo", width: 220 },
  { field: "precio", headerName: "precio", width: 10 },
  { field: "cantidad", headerName: "cantidad", width: 130 },
];

export default function DataTable({id}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const getDataList = React.useCallback(async () => {
    try {
      const response = await axios.get(`/ventasProductos/${id}`, {
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

  const filteredData = data?.filter((item) =>
    item.nombrePro?.toLowerCase().includes(searchTerm.toLowerCase())
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
      />
    </div>
  );
}
