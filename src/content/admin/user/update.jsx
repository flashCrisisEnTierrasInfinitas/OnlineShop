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
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";


export default function Update({ data }) {
    const [visible, setVisible] = useState(false);
    var token = Cookies.get('token');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: data.row.name,
        last_name: data.row.last_name,
        email: data.row.email,
        role: data.row.role,
        status: data.row.status,
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
            setLoading(true)
            const response = await axios.put(`/users/${data.row.id}`, formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + token,
                },
            });
            setVisible(false);
            setLoading(false)
            console.log(response);
            return Swal.fire({
                position: "center",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setLoading(false)
            return Swal.fire({
                position: "center",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <>
            <CButton onClick={() => setVisible(!visible)} variant="outline">
                <i className="fa fa-wrench" aria-hidden="true" />
            </CButton>
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
                                label="Nombres"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                name="last_name"
                                label="Apellidos"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="email"
                                name="email"
                                label="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel>Tipo Usuario</CFormLabel>
                            <CFormSelect
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value={0}>Invitado</option>
                                <option value={1}>Admin</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel>Estado</CFormLabel>
                            <CFormSelect
                                id="status"
                                name="status"
                                value={formData.status}
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
                    <CButton
                        color="primary"onClick={handleSubmit}
                    >
                        {loading ? (
                            <div className="progess">
                                <CSpinner color="light" size="sm" style={{ width: '1rem', height: '1rem' }} />
                            </div>
                        ) : (<>save</>)}
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
