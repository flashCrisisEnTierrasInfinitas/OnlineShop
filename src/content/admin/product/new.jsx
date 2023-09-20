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
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import isMountedRef from "../../../hooks/useRefMounted";

export default function New() {
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [imgname, setNameImg] = useState("");
    const [TypePro, setTypePro] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingUpload,setloadingUpload]= useState(false);

    const [formData, setFormData] = useState({
        nombrePro: "",
        id_category: 1,
        codigoPro: "",
        descripPro: "",
        precioPro: "",
        stockPro: "",
        featured: imgname,
    });


    useEffect(() => {
        setFormData({
            ...formData,
            featured: imgname || "",
        });
    }, [imgname]);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };
    const nombrePro = formData.nombrePro;

    const Upload = async () => {
        const formData = new FormData();

        formData.append("image", image);
        formData.append("nombre", nombrePro);

        try {
            setloadingUpload(true);
            const response = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setNameImg(response.data.url);
            setloadingUpload(false);
            return console.log(response.data.url);
        } catch (error) {
            setloadingUpload(false);
            return console.error(error);
        }
    };
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
            const response = await axios.post("/product", formData);
            setVisible(false);
            setLoading(false);
            return Swal.fire({
                position: "center",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 5500,
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

    const getTypePro = useCallback(async () => {
        try {
            const response = await axios.get("/categoryProd", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setTypePro(response.data);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);
    useEffect(() => {
        getTypePro();
    }, [getTypePro]);

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
                            <CFormSelect name="id_category" onChange={handleChange}>
                                <option>Seleccione ...</option>
                                {TypePro.map((option) => (
                                    <option
                                        value={option.id}
                                        key={option.id}
                                        onChange={handleChange}
                                    >
                                        {option.name}
                                    </option>
                                ))}
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
                        <CCol md={12}>
                            <CFormInput
                                type="file"
                                name="featured"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <CButton onClick={Upload}>  {loadingUpload ? (
                                <div className="progess">
                                    <CSpinner color="light" size="sm" style={{ width: '1rem', height: '1rem' }} />
                                </div>
                            ) : (<label>Upload Image</label>)}</CButton>
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
                                <CSpinner color="light" size="sm" style={{ width: '1rem', height: '1rem' }} />
                            </div>
                        ) : (<label>Save</label>)}
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}
