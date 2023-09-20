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
    CSpinner,
} from "@coreui/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function New() {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        color: "",
        state: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/categoryProd",
                formData
            );
            console.log("🚀 ~ file: new.jsx:44 ~ handleSubmit ~ response:", response)
            setVisible(false);
            setLoading(false);
            return Swal.fire({
                position: "center",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setLoading(false);
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
                                name="name"
                                label="Nombre"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="color"
                                name="color"
                                label="color"
                                value={formData.color}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol md={12}>
                            <CFormLabel>Estado</CFormLabel>
                            <CFormSelect
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            >
                                <option value={0}>Activo</option>
                                <option value={1}>Inactivo</option>
                            </CFormSelect>
                        </CCol>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={() => handleSubmit()}>
                    {loading ? (
                    <div className="progess">
                        <CSpinner color="light" size="sm" style={{ width: '1rem', height: '1rem'}}/>
                    </div>
                ) : (<label>Save</label>)}
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
