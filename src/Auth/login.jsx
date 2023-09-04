import { CFormInput } from "@coreui/react";
import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        Usuario: "",
        Password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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
                    <form className="form-login">
                        <h1 className="top-50">Ingresar</h1>
                        <CFormInput
                            placeholder="Usuario"
                            className="inpunt-login"
                            name="Usuario"
                            value={formData.Usuario}
                            onChange={handleChange}
                        />
                        <CFormInput
                            placeholder="Password"
                            className="inpunt-login"
                            type="Password"
                            name="Password"
                            value={formData.Password}
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
                        <button type="button" className="btn1 btn-secondary">Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
