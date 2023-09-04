import { CFormInput } from "@coreui/react";
import { useState } from "react";

export default function Conted() {

    const [dataLog, setDataLog] = useState({
        Nombre: "",
        Apellido: "",
        Direccion: "",
        telefono: "",
        Usuario: "",
        Password: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataLog((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="conted-profile margin-90">
            <div className="avatar-profile flex top-50">
                <img src="img/avatar/istockphoto-1309328823-612x612.jpg" alt="avatar" />
            </div>
            <div className="info-profile top-50 margin-90">
                <form className="form-login">
                    <CFormInput
                        placeholder="Nombre"
                        className="inpunt-login"
                        name="Nombre"
                        value={dataLog.Nombre}
                        onChange={handleChange}
                    />
                    <CFormInput
                        placeholder="Apellido"
                        className="inpunt-login"
                        name="Apellido"
                        value={dataLog.Apellido}
                        onChange={handleChange}
                    />
                    <div className="grid">
                        <CFormInput
                            placeholder="Direccion"
                            className="inpunt-login"
                            name="Direccion"
                            value={dataLog.Direccion}
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
                            placeholder="Usuario"
                            className="inpunt-login"
                            name="Usuario"
                            value={dataLog.Usuario}
                            onChange={handleChange}
                        />
                        <CFormInput
                            placeholder="Password"
                            className="inpunt-login"
                            type="Password"
                            name="Password"
                            value={dataLog.Password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex">
                        <button type="button" className="btn1 btn-primary">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}