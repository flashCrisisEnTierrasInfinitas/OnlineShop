import { CFormInput, CSpinner } from "@coreui/react";
import { Button } from "@mui/joy";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Conted({ data }) {
    var token = Cookies.get('token');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataLog, setDataLog] = useState({
        name: data.name,
        last_name: data.last_name,
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email,
        img: image
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataLog((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    useEffect(() => {
        setDataLog({
            ...dataLog,
            img: image || "",
        });
    }, [image]);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };
    const hanleSave = async (id) => {
        try {
            setLoading(true);
            const response = await axios.put(`/users/${id}`, dataLog, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + token,
                },
            });
            setLoading(false);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
        
              Toast.fire({
                icon: 'success',
                title: response.data.message
              })
        } catch (error) {
            setLoading(false);
            console.log(error.response.data)
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
        
              Toast.fire({
                icon: 'error',
                title: error.response.data.message,
                text: error.response.data.error,
              })
        }

    };
    return (
        <div className="conted-profile margin-90">
            <div className="avatar-profile flex top-50">
                <img src="" alt={data.name} />
            </div>
            <div className="info-profile top-50 margin-90">
                <form className="form-login">
                    <div class="mb-3">
                        <input class="form-control" type="file" id="formFile" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <div className="grid">
                        <CFormInput
                            placeholder="Nombre"
                            className="inpunt-login"
                            name="name"
                            value={dataLog.name}
                            onChange={handleChange}
                        />
                        <CFormInput
                            placeholder="Apellido"
                            className="inpunt-login"
                            name="last_name"
                            value={dataLog.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid">
                        <CFormInput
                            placeholder="Direccion"
                            className="inpunt-login"
                            name="direccion"
                            value={dataLog.direccion}
                            onChange={handleChange}
                        />
                        <CFormInput
                            placeholder="Numero de telefono"
                            className="inpunt-login"
                            name="telefono"
                            value={dataLog.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid">
                        <CFormInput
                            placeholder="Email"
                            className="inpunt-login"
                            name="email"
                            value={dataLog.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex top-50">
                        <Button onClick={()=>hanleSave(data.id)}>
                            {loading ? (
                                <div className="progess">
                                    <CSpinner color="light" size="sm" style={{ width: '1rem', height: '1rem' }} />
                                </div>
                            ) : (<>Actualizar</>)}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}