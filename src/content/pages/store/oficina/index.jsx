import axios from "axios";
import Cookies from "js-cookie";
import { useState, useCallback, useEffect } from "react";
import {
    CCol,
    CForm,
    CFormInput,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CSpinner,
} from "@coreui/react";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import BackupIcon from "@mui/icons-material/Backup";
import Swal from "sweetalert2";
import { Button, Tooltip } from "@mui/joy";
import GradingIcon from "@mui/icons-material/Grading";
import DataGrids from "./dataGrid";
import PDF from "./pdf";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

export default function Oficina({
    setAllproducts,
    setCountProducts,
    setTotal,
    Seccion,
}) {
    const [loading, setLoading] = useState(false);
    const [venta, setVenta] = useState([]);
    const [image, setImage] = useState(null);
    var getToken = Cookies.get("token");

    const datas = localStorage.getItem("allProducts");
    const productos = JSON.parse(datas);

    const [formData, setFormData] = useState({
        user_venta: "Admin",
        user_compra: Seccion,
        direccion: "Oficina",
        user_telefono: "000000",
        tipo_servicio: 0,
        img: image,
        productos: productos.map((producto) => ({
            id: producto.id,
            cantidad: producto.quantity,
        })),
    });
    console.log("🚀 ~ file: index.jsx:48 ~ formData:", formData)
    useEffect(() => {
        setFormData({
            ...formData,
            img: image || "",
        });
    }, [image]);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };
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

    return (
        <div className="conter-home">
            <div className="header-pay">
                <div className="text-home">
                    <a className="top-50">
                        <h3>
                            ¡confirma tu solicitud de pedido, dando clic en el batón azul!
                        </h3>
                        <h5 className="color-gray">
                            Luego de confirmar tu pedido, aparcera un nuevo batón, da clic en
                            él, y toma captura de pantalla de la factura, ten presente que sin
                            la captura, no se entregara el producto¡¡
                        </h5>
                    </a>
                </div>
                <div className="flex top-50 boton-product">
                    {id ? <PDF id={id} /> : ""}
                    <MetodoPago halendOficina={halendOficina} loading={loading} handleImageChange={handleImageChange} />
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

export function MetodoPago({ halendOficina, loading, handleImageChange }) {
    const [visible, setVisible] = useState(false);
    const [pay, seyPay] = useState(false);
    return (
        <>
            <Tooltip title="Confirmar Solicitud">
                <Button onClick={() => setVisible(!visible)}>
                    <GradingIcon />
                </Button>
            </Tooltip>

            <CModal
                size="xl"
                backdrop="static"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="StaticBackdropExampleLabel"
            >
                <CModalHeader>
                    <CModalTitle id="StaticBackdropExampleLabel">
                        <div className="logo-pagos">
                            <img src="/img/logos/logo1.png" alt="Asupro" />
                        </div>
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3">
                        <CCol md={6}>
                            <p style={{ fontWeight: "500" }}>Pago Virtual:</p>
                            <div className="flex">
                                <Button onClick={() => seyPay(true)}>
                                    <CreditScoreIcon />
                                </Button>
                            </div>
                        </CCol>
                        <CCol md={6}>
                            <p style={{ fontWeight: "500" }}>Pago En Efectivo:</p>
                            <div className="flex">
                                <Button onClick={() => halendOficina()}>
                                    {loading ? (
                                        <div className="progess">
                                            <CSpinner
                                                color="light"
                                                size="sm"
                                                style={{ width: "1rem", height: "1rem" }}
                                            />
                                        </div>
                                    ) : (
                                        <LocalAtmIcon />
                                    )}
                                </Button>
                            </div>
                        </CCol>
                        <CCol md={12}>
                            <div>
                                <CFormInput type="file" size="lg" id="formFileLg" label="Large file input example" />
                            </div>
                        </CCol>
                        <CCol md={6}>{pay ? <div className="box-file">
                            <div className="drag-file-area">
                                <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                                <p>Arrastra y suelta el comprabante de pago.</p>
                                <input
                                    type="file"
                                    id="fileInput"
                                    class="custom-file-input"
                                    name="featured"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <label for="fileInput" class="custom-file-label"></label>
                            </div>
                            <Button onClick={halendOficina}>
                                {loading ? (
                                    <div className="progess">
                                        <CSpinner
                                            color="light"
                                            size="sm"
                                            style={{ width: "1rem", height: "1rem" }}
                                        />
                                    </div>
                                ) : (
                                    <BackupIcon />
                                )}
                            </Button>
                        </div> : ""}</CCol>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
}
