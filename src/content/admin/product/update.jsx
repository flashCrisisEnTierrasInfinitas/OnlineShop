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
import Cookies from "js-cookie";

export default function Update({ data, token }) {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [TypePro, setTypePro] = useState([]);
  const [loading, setLoading] = useState(false);
  var getToken = Cookies.get("token");

  const [formData, setFormData] = useState({
    nombrePro: data.row.nombrePro,
    id_category: data.row.id_category,
    codigoPro: data.row.codigoPro,
    descripPro: data.row.descripPro,
    status: data.row.status,
    precioPro: data.row.precioPro,
    stockPro: data.row.stockPro,
    oferta: data.row.oferta,
    peso: data.row.peso,
    Presentacion: data.row.Presentacion,
    categorias: data.row.categorias,
    img: image,
  });
  console.log("🚀 ~ Update ~ formData:", formData);
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
      const response = await axios.post(
        `/product/${data.row.id}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: "Bearer " + getToken,
          },
        }
      );
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
        title: error.response.data.message,
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
              <CFormLabel>tipo producto</CFormLabel>
              <CFormSelect
                name="id_category"
                onChange={handleChange}
                value={formData.id_category}
              >
                <option>Seleccione..</option>
                {TypePro.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                name="categorias"
                label="categorias"
                value={formData.categorias}
                onChange={handleChange}
              />
            </CCol>{" "}
            <CCol md={6}>
              <CFormLabel>Cantidades</CFormLabel>
              <CFormSelect
                name="peso"
                onChange={handleChange}
                value={formData.peso}
              >
                <option>Seleccione..</option>
                <option value="un">unidades</option>
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
            <CCol md={6}>
              <CFormLabel>Oferta?</CFormLabel>
              <CFormSelect
                id="oferta"
                name="oferta"
                value={formData.oferta}
                onChange={handleChange}
              >
                <option value={0}>NO</option>
                <option value={1}>SI</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel>estado</CFormLabel>
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
