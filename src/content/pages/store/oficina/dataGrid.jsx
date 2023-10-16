import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataGrids({
    data
}) {
    const Status = ({ data }) => {
        console.log(data)
        if (data.status == 0) {
            return (<p>sapo</p>)
        }
        if (data.status == 1) {
            return <>Inactivo</>
        }
    }

    const columns = [
        { field: "id", headerName: "ID", width: 20 },
        { field: "nombrePro", headerName: "Nombre", width: 130 },
        { field: "cantidad", headerName: "cantidad", width: 130 },
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
        { field: "precio", headerName: "precio", width: 130 },  
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