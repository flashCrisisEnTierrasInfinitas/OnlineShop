import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CSpinner } from "@coreui/react";

export default function DataGrids({
    data,
    loading
}) {

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <CSpinner color="danger" />
            </div>
        );
    }
    const columns = [
        { field: "id", headerName: "ID", width: 20 },
        { field: "nombrePro", headerName: "Nombre", width: 130 },
        { field: "quantity", headerName: "cantidad", width: 130 },
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
        { field: "precioPro", headerName: "precio", width: 130 },  
        { field: "created_at", headerName: "fecha", width: 230 },
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