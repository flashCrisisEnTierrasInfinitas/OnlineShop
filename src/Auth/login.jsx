import { CFormInput } from "@coreui/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login() {

    const [log, setLog] = useState(false)
    //VALORES QUE SE ENVIAN EN EL AXIOS
    const [dataLog, setDataLog] = useState({
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
    //REGISTRO DEL USUARIO
    const RegLog = () => {
        if (!dataLog.Usuario | dataLog.Password) {
            return Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Todos los campos son requeridos',
                showConfirmButton: false,
                timer: 1900
            })
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registro exitoso',
                showConfirmButton: false,
                timer: 1900
            })
            return window.location.replace("/");
        }
    }
    //INGRESO DEL USUARIO
    const Sing = () => {

    }


    return (
        <div className="conted-login grid">
            <div className="conter-box-login grid">
                <div className="wellcome">
                    <div className="text-wellcome">
                        <a>
                            <p>WELCOME</p>
                            <label>ASUPRO</label>
                            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum molestiae aspernatur nisi, reiciendis</h3>
                        </a>
                    </div>
                </div>
                <div className="box-login">
                    {log ? (<form className="form-login">
                        <h1 className="top-50">Registrarse</h1>
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
                        <div className="conte-terminos">
                            <div>
                                <input type="checkbox" checked />
                                <label className="color-gray">Acepta términos y condiciones</label>
                            </div>
                        </div>
                        <div className="flex">
                            <button type="button" className="btn1 btn-primary" onClick={() => RegLog()}>Registrarse</button>
                        </div>
                    </form>) : (<form className="form-login">
                        <h1 className="top-50">Ingresar</h1>
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
                        <div className="conte-terminos">
                            <div>
                                <input type="checkbox" checked />
                                <label className="color-gray">Acepta términos y condiciones</label>
                            </div>
                            <div>
                                <label>¿Olvido su contraseña?</label>
                            </div>
                        </div>
                        <div className="flex">
                            <button type="button" className="btn1 btn-primary" onClick={() => setLog(true)}>Registrarse</button>
                            <button type="button" className="btn1 btn-secondary">Ingresar</button>
                        </div>
                    </form>)}

                </div>
            </div>
        </div>
    );
}
