import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Icons from "./icons";

export default function DataGrids({
    data
}) {
    const [searchTerm, setSearchTerm] = React.useState("");

    const columns = [
        { field: "id", headerName: "ID", width: 20 },
        { field: "name", headerName: "Nombre", width: 130 },
        { field: "last_name", headerName: "last_name", width: 130 },
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
        { field: "email", headerName: "email", width: 230 },
        { field: "role", headerName: "role", width: 10 },
        { field: "status", headerName: "status", width: 10 },
        { field: "created_at", headerName: "fecha", width: 230 },
        {
            field: "actions", // Nombre del campo
            headerName: "Acciones", // Nombre en la cabecera
            width: 100, // Ancho de la columna
            renderCell: (params) => <Icons data={params} />,
        },
    ];





    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                columns={columns}
                rows={data}
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
