import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
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

export default function New({ token }) {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [TypePro, setTypePro] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombrePro: "",
    id_category: 1,
    codigoPro: "",
    descripPro: "",
    precioPro: "",
    stockPro: "",
    status: "0",
    oferta: "0",
    categorias: "",
    peso: "",
    Presentacion: "",
    img: image,
  });

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //* envia la data para crear un nuevo registro
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/product", formData, {
        headers: {
          " X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
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
      <CButton variant="outline" onClick={() => setVisible(!visible)}>
        <i class="fa fa-pencil" aria-hidden="true" />
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
            <CCol md={6}>
              <CFormInput
                type="text"
                name="categorias"
                label="categorías"
                value={formData.categorias}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Cantidades</CFormLabel>
              <CFormSelect
                name="peso"
                onChange={handleChange}
                value={formData.peso}
              >
                <option>Seleccione..</option>
                <option value="lb">libras</option>
                <option value="kg">kilos</option>
                <option value="g">gramos</option>
                <option value="arr">arroba</option>
                <option value="do">docenas</option>
                <option value="lt">litro</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Presentación</CFormLabel>
              <CFormSelect
                name="Presentacion"
                onChange={handleChange}
                value={formData.Presentacion}
              >
                <option>Seleccione..</option>
                <option value="un">unidades</option>
                <option value="cj">caja</option>
                <option value="paq">paquetes</option>
                <option value="cube">cubeta</option>
                <option value="doce">docenas</option>
                <option value="blt">bulto</option>
                <option value="can">canasta</option>
                <option value="bto">botella</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormTextarea
                id="exampleFormControlTextarea1"
                label="Descripcion"
                rows={3}
                text="Must be 8-20 words long."
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
                <CSpinner
                  color="light"
                  size="sm"
                  style={{ width: "1rem", height: "1rem" }}
                />
              </div>
            ) : (
              <label>Save</label>
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
