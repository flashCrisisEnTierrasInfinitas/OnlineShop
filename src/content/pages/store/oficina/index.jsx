import axios from "axios";
import Cookies from "js-cookie";
import isMountedRef from "../../../../hooks/useRefMounted";
import { useState, useCallback, useEffect } from "react";
import { CSpinner } from "@coreui/react";
import Factura from "../../facturaPay";
import Swal from "sweetalert2";
import { Button, Tooltip } from "@mui/joy";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DataGrids from "./dataGrid";


export default function Oficina({
    setAllproducts,
    setCountProducts,
    setTotal,
    Seccion
}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [venta, setVenta] = useState([]);
    console.log("🚀 ~ file: index.jsx:23 ~ venta:", venta.id)
    const [Error, setError] = useState(false);
    const [Message, setMessage] = useState([]);
    var getToken = Cookies.get('token');

    const datas = localStorage.getItem('allProducts');
    const productos = JSON.parse(datas);

    const [formData, setFormData] = useState({
        user_venta: "Admin",
        user_compra: Seccion,
        direccion: "Oficina",
        user_telefono: "000000",
        tipo_servicio: 0,
        productos: productos.map(producto => ({
            id: producto.id,
            cantidad: producto.quantity
        }))
    });

    const halendOficina = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/ventas", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + getToken,
                },
            });
            setVenta(response.data.data)
            setLoading(false);
            setAllproducts([]);
            setTotal(0);
            setCountProducts(0);
            return Swal.fire({
                position: "center",
                icon: "info",
                title: "Su informacion,sera validada,para el respectivo envio!!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setLoading(false);
            return Swal.fire({
                position: "center",
                icon: "error",
                title: 'error al enviar los datos!!',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
    Cookies.set('ventaId', venta.id, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
    var id = Cookies.get('ventaId');
    const getDataList = useCallback(async () => {
        try {
            const response = await axios.get(`/listOneVenta/${id}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + getToken,
                },
            });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setMessage(error.response.data.message)
            setLoading(false);
            setError(true)
        }
    }, [isMountedRef]);
    useEffect(() => {
        getDataList();
    }, [getDataList]);
    getDataList();
    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <CSpinner color="danger" />
            </div>
        );
    }

    return (
        <div className='conter-home'>
            <div className="header-pay">
                <div className="text-home">
                    <a className='top-50'>
                        <h3>¡confirma tu solicitud de pedido, dando click en el batón azul!</h3>
                        <h5 className="color-gray">¡Al final de la página, se generará una factura, tomale captura de pantalla, (es demasiado, importate, sin la evidencia de la factura, no se le entregará su pedido!!)</h5>
                    </a>
                </div>
                <div className="flex top-50">
                    <Tooltip title='Confirmar Solicitud'>
                        <Button onClick={halendOficina}>
                            {loading ? (
                                <div className="progess">
                                    <CSpinner color="light" size="sm" style={{ width: '1rem', height: '1rem' }} />
                                </div>
                            ) : (<SaveAltIcon />)}
                        </Button>
                    </Tooltip>
                </div>
                <div className=" flex top-50">
                    <div>
                        <DataGrids data={productos} />
                    </div>
                </div>
                <div className="text-home">
                    <a className='top-50'>
                        <h3>Toma captura de la factura, para reclamar su producto en nuestra tienda.</h3>
                    </a>
                </div>
                <div className="margin-90">
                    <div className='top-50'>
                        <Factura data={data} />
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}