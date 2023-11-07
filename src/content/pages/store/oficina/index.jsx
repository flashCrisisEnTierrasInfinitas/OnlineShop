import axios from "axios";
import Cookies from "js-cookie";
import { useState, useCallback, useEffect } from "react";
import { CSpinner } from "@coreui/react";
import Factura from "../../facturaPay";
import Swal from "sweetalert2";
import { Button, Tooltip } from "@mui/joy";
import GradingIcon from '@mui/icons-material/Grading';
import DataGrids from "./dataGrid";
import PDF from "./pdf";
import Metodo from "./metodo";

export default function Oficina({
    setAllproducts,
    setCountProducts,
    setTotal,
    Seccion
}) {
    const [loading, setLoading] = useState(true);
    const [venta, setVenta] = useState([]);
    var getToken = Cookies.get("token");

    const datas = localStorage.getItem("allProducts");
    const productos = JSON.parse(datas);

    const [formData, setFormData] = useState({
        user_venta: "Admin",
        user_compra: Seccion,
        direccion: "Oficina",
        user_telefono: "000000",
        tipo_servicio: 0,
        productos: productos.map((producto) => ({
            id: producto.id,
            cantidad: producto.quantity,
        })),
    });

    const halendOficina = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/ventas", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: "Bearer " + getToken,
                },
            });
            Cookies.set("ventaId", response.data.data.id, { expires: 1 });
            setVenta(response.data.data);
            setLoading(false);
            setAllproducts([]);
            setTotal(0);
            setCountProducts(0);
            return Swal.fire({
                position: "center",
                icon: "success",
                title: "Pedido Exitoso",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setLoading(false);
            return Swal.fire({
                position: "center",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
    var id = Cookies.get("ventaId");

    const MetosPago = () => {

    }

    return (
        <div className="conter-home">
            <div className="header-pay">
                <div className="text-home">
                    <a className="top-50">
                        <h3>
                            ¡confirma tu solicitud de pedido, dando clic en el batón azul!
                        </h3>
                        <h5 className="color-gray">
                            Luego de confirmar tu pedido, aparcera un nuevo batón, da clic en él, y toma captura de pantalla de la factura, ten presente que sin la captura, no se entregara el producto¡¡
                        </h5>
                    </a>
                </div>
                <div className="flex top-50 boton-product">
                    {id ? (
                        <PDF id={id} />
                    ) : (
                        ""
                    )}
                    <MetodoPago halendOficina={halendOficina} />
                </div>
                <div className=" flex top-50">
                    <div>
                        <DataGrids data={productos} loading={loading} />
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
        </div>
    );
}


export function MetodoPago({ halendOficina }) {
    return (
        <>
            <Tooltip title="Confirmar Solicitud">
                <Button onClick={() => halendOficina()}>
                    <GradingIcon />
                </Button>
            </Tooltip>
        </>
    )
}