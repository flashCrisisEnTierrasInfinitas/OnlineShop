import Swal from "sweetalert2";
import BackupIcon from "@mui/icons-material/Backup";
import { Button } from "@mui/joy";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { CSpinner } from "@coreui/react";

export default function Conted({
  setAllproducts,
  setCountProducts,
  total,
  setTotal,
  token,
  Seccion
}) {
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = localStorage.getItem('allProducts');
  const productos = JSON.parse(data);

  const [formData, setFormData] = useState({
    user_venta: "Admin",
    user_compra: Seccion,
    direccion: "",
    user_telefono: "",
    tipo_servicio: 1,
    img: image,
    productos: productos.map(producto => ({
      id: producto.id,
      cantidad: producto.quantity
    }))
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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.direccion | !formData.user_telefono | !formData.img) {
      return setOpen(true);
    }
    try {
      setLoading(true);
      const response = await axios.post("/ventas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + token,
        },
      });
      console.log(response)
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
  };

  return (
    <div className="conter-pay margin-90 top-50">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} className="conter-alerts">
        <Alert variant="filled" severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          ¡Todos, los campos son requeridos!!
        </Alert>
      </Snackbar>
      <p>
        Para proceder con el pago, consigne el monto total de su compra al
        número de cuenta:<span className="color-secondary">311533906</span>su
        monto total es: <span className="color-secondary">${total}</span>
      </p>
      <div className="top-50 bottom-50">
        <form className="grid  margin-90">
          <div>
            <input
              type="text"
              placeholder="Direccion del envio"
              class="form-control"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Numero de telefono"
              class="form-control"
              name="user_telefono"
              value={formData.user_telefono}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="top-50">
        <div className="logos-pay">
          <div>
            <img src="img/icons/nequi-2.svg" />
          </div>
          <div>
            <img src="img/icons/daviplata.svg" />
          </div>
        </div>
      </div>
      <p className="top-50">
        Puedes hacer tu transferencia a través de nuestros dos métodos de pago,
        toma captura del pago y súbelo en este recuadro¡!
      </p>
      <div className="box-file">
        <div className="drag-file-area">
          <i class="fa fa-cloud-upload" aria-hidden="true"></i>
          <p>Arrastra y suelta cualquier archivo aquí</p>
          <input type="file" id="fileInput" class="custom-file-input" name="featured" accept="image/*" onChange={handleImageChange} />
          <label for="fileInput" class="custom-file-label"></label>
        </div>
        <Button onClick={handleSubmit}>
          {loading ? (
            <div className="progess">
              <CSpinner color="light" size="sm" style={{ width: '1rem', height: '1rem' }} />
            </div>
          ) : (<BackupIcon />)}
        </Button>
      </div>
    </div>
  );
}
