import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CFormInput, CSpinner } from '@coreui/react';
import isMountedRef from '../../../hooks/useRefMounted'
import axios from 'axios';
import { Box, Button } from '@mui/material';
import Icons from './icons';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombrePro', headerName: 'Nombre', width: 130 },
    {
        field: 'img',
        headerName: 'img',
        width: 90,
        renderCell: (params) => (
            <img src={params.row.img} alt={params.row.nombrePro} className="img-table" />
        ),
    },
    { field: 'descripPro', headerName: 'Descripción', width: 200 },
    {
        field: 'codigoPro',
        headerName: 'Age',
        type: 'Codigo',
        width: 90,
    },
    { field: 'id_category', headerName: 'Categoria', width: 10 },
    { field: 'created_at', headerName: 'Fecha', width: 130 },
    { field: 'precioPro', headerName: 'Precio', width: 130 },
    { field: 'stockPro', headerName: 'Stock', width: 10 },
    {
        field: 'actions', // Nombre del campo
        headerName: 'Acciones', // Nombre en la cabecera
        width: 100, // Ancho de la columna
        renderCell: (params) => (
            <Icons data={params} />
        ),
    },
];


export default function DataTable() {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    console.log("🚀 ~ file: tableMaterial.jsx:33 ~ DataTable ~ data:", data)

    const getDataList = React.useCallback(async () => {
        try {
            const response = await axios.get(`/product`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
        )
    }


    const filteredData = data?.filter((item) =>
        item.nombrePro?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ height: 400, width: '100%' }}>
            <div className="conter-search">
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
