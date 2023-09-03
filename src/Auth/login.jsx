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
    console.log(formData);
    return (
        <div className="conted-login grid">
            <div className="conter-box-login grid">
                <div className="wellcome">

                </div>
                <div className="box-login">
                    <form className="form-login">
                        <h1 className="top-50 color-primary">Iniciar</h1>
                        <CFormInput
                            placeholder="Usuario"
                            className="input-search"
                            name="Usuario"
                            value={formData.Usuario}
                            onChange={handleChange}
                        />
                        <CFormInput
                            placeholder="Password"
                            className="input-search"
                            type="Password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
