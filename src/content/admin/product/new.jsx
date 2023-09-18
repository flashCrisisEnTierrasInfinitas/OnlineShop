import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from "@coreui/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function New() {
    const [visible, setVisible] = useState(false);

    const [formData, setFormData] = useState({
        nombrePro: "",
        tipoPro: 0,
        codigoPro: "",
        descripPro: "",
        precioPro: "",
        stockPro: "",
    });
    console.log("🚀 ~ file: new.jsx:28 ~ New ~ formData:", formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "/product",
                formData
            );
            setVisible(false);
            return Swal.fire({
                position: "center",
                icon: "success",
                title: response.data,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            return Swal.fire({
                position: "center",
                icon: "error",
                title: error,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <>
            <CButton onClick={() => setVisible(!visible)}>Nuevo</CButton>
            <CModal
                size="xl"
                backdrop="static"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="StaticBackdropExampleLabel"
            >
                <CModalHeader>
                    <CModalTitle id="StaticBackdropExampleLabel">Producto</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3">
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                name="nombrePro"
                                label="Nombre"
                                value={formData.nombrePro}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                name="codigoPro"
                                label="Codigo"
                                value={formData.codigoPro}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel>tipo Producto</CFormLabel>
                            <CFormSelect
                                id="tipoPro"
                                name="tipoPro"
                                value={formData.tipoPro}
                                onChange={handleChange}
                            >
                                <option value={0}>Verduras</option>
                                <option value={1}>Electrodomestico</option>
                                <option value={3}>cocina</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={12}>
                            <CFormLabel>Descripcion</CFormLabel>
                            <textarea
                                type="text"
                                name="descripPro"
                                value={formData.descripPro}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="number"
                                name="precioPro"
                                label="Precio"
                                value={formData.precioPro}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="number"
                                name="stockPro"
                                label="Stock"
                                value={formData.stockPro}
                                onChange={handleChange}
                            />
                        </CCol>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={() => handleSubmit()}>
                        Save
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
