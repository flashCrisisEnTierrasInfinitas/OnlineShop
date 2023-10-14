import { CFormInput, CSpinner } from "@coreui/react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { Button } from "@mui/joy";
import Alerts from "../components/alerts";

export default function Login() {
  const [log, setLog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [data, setData] = useState('');
  const [open, setOpen] = useState(false);

  const Cooki = () => {
    Cookies.set('token', token, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
    Cookies.set('role', role, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
  }
  Cooki();

  const [dataLog, setDataLog] = useState({
    email: "",
    password: "",
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
        position: "top-end",
        icon: "error",
        title: "Todos los campos son requeridos",
        showConfirmButton: false,
        timer: 1900,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registro exitoso",
        showConfirmButton: false,
        timer: 1900,
      });
      return window.location.replace("/");
    }
  };
  //INGRESO DEL USUARIO
  const Sing = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/auth/login", dataLog);
      setToken(response.data.access_token);
      setRole(response.data.role);
      setLoading(false);
      return (window.location.href = "/");
    } catch (error) {
      setData(error.response.data.error);
      console.error("Error al iniciar sesión:", error.response.data);
      setLoading(false);
      setOpen(true);
    }
  };

  return (
    <div className="conted-login">
      <Alerts open={open} setOpen={setOpen} data={data} color={'error'}/>
      <div className="conter-box-login">
        <div className="box-">
          {log ? (
            <form className="form-login">
              <h1 className="top-50">Registrarse</h1>
              <CFormInput
                placeholder="email"
                className="inpunt-login"
                name="email"
                value={dataLog.email}
                onChange={handleChange}
              />
              <CFormInput
                placeholder="Password"
                className="inpunt-login"
                type="password"
                name="password"
                value={dataLog.password}
                onChange={handleChange}
              />
              <div className="conte-terminos">
                <div>
                  <input type="checkbox" checked />
                  <label className="color-gray">
                    Acepta términos y condiciones
                  </label>
                </div>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="btn1 btn-primary"
                  onClick={() => RegLog()}
                >
                  Registrarse
                </button>
              </div>
            </form>
          ) : (
            <form className="form-login">
              <h1 className="top-50">Ingresar</h1>
              <CFormInput
                placeholder="email"
                className="inpunt-login"
                name="email"
                value={dataLog.email}
                onChange={handleChange}
              />
              <CFormInput
                placeholder="Password"
                className="inpunt-login"
                type="password"
                name="password"
                value={dataLog.password}
                onChange={handleChange}
              />
              <div className="conte-terminos">
                <div>
                  <input type="checkbox" checked />
                  <label className="color-gray">
                    Acepta términos y condiciones
                  </label>
                </div>
                <div>
                  <label>¿Olvido su contraseña?</label>
                </div>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="btn1 btn-primary"
                  onClick={() => setLog(true)}
                >
                  Registrarse
                </button>
                <button
                  type="button"
                  className="btn1 btn-secondary"
                  onClick={Sing}
                >
                  {loading ? (
                    <div className="progess">
                      <CSpinner color="light" size="sm" style={{ width: '1rem', height: '1rem' }} />
                    </div>
                  ) : (<label>Ingresar</label>)}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
