import { CFormInput, CSpinner } from "@coreui/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

function useSafeNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  const safeNavigate = (path) => {
    console.log("🚀 ~ safeNavigate ~ path:", path);
    console.log("🚀 ~ useSafeNavigate ~ location:", location);

    if (location.pathname === "/") {
      // Si estás en la página de inicio, navega a otra página de tu elección
      navigate(location.pathname);
    } else {
      // De lo contrario, intenta retroceder dos entradas en el historial
      navigate(-2);
    }
  };

  return safeNavigate;
}

const styles = {
  btn: {
    color: "#2854D8",
    border: "1px solid #2854D8",
  },
};

export default function Login() {
  const history = useNavigate();

  const safeNavigate = useSafeNavigate();

  const [log, setLog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [seccion, setSeccion] = useState("");
  const [id, setId] = useState("");
  const [img, setImg] = useState("");
  const [open, setOpen] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const goToEntry = (entryIndex) => safeNavigate(entryIndex);

  const Cooki = () => {
    Cookies.set("token", token, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
    Cookies.set("role", role, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
    Cookies.set("seccion", seccion, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
    Cookies.set("id", id, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
    Cookies.set("img", img, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
  };
  Cooki();

  const [dataLog, setDataLog] = useState({
    name: "",
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
  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };
  //REGISTRO DEL USUARIO

  //INGRESO DEL USUARIO
  const Sing = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/auth/login", dataLog);
      setToken(response.data.access_token);
      setRole(response.data.role);
      setSeccion(response.data.seccion);
      setId(response.data.id);
      setImg(response.data.img);
      setLoading(false);

      /*   if (response.data.role == 1) {
        return (window.location.href = "/dahsboard/0");
      } */
      // Redirige de vuelta a la URL almacenada si es una URL válida, de lo contrario redirige al inicio
      if (response.data.role === 1) {
        return (window.location.href = "/dahsboard/0");
      } else {
        goToEntry();
      }
    } catch (error) {
      setLoading(false);
      setOpen(true);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  };

  const hanledRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/auth/register", dataLog);
      setToken(response.data.access_token);
      setRole(response.data.role);
      setLoading(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "registrado con exito!!",
        title: "Signed in successfully",
      });
      return (window.location.href =
        "/au5Z4YhReMcxh1r0WdbGNrGiMU7+j6CfaUrMxP2TGJNv7ZgI72muOl1gie2Lc7da");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response.data);
      setLoading(false);
      setOpen(true);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title:
          "Error:Verifique que su correo no esté registrado, o la contraseña no cumpla con los 8 caracteres",
      });
    }
  };

  return (
    <div className="conted-login">
      <div className="conter-box-login">
        <div className="box-">
          {log ? (
            <form className="form-login">
              <h1 className="top-50">Registrarse</h1>
              <CFormInput
                placeholder="nombre"
                className="inpunt-login"
                name="name"
                value={dataLog.name}
                onChange={handleChange}
              />
              <CFormInput
                placeholder="email"
                className="inpunt-login"
                name="email"
                value={dataLog.email}
                onChange={handleChange}
              />
              <div className="flex">
                <CFormInput
                  placeholder="password"
                  className="inpunt-login"
                  name="password"
                  type={mostrarPassword ? "text" : "password"}
                  value={dataLog.password}
                  onChange={handleChange}
                />
                <button
                  onClick={toggleMostrarPassword}
                  type="button"
                  className="btn1"
                  style={styles.btn}
                >
                  {mostrarPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
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
                  className="btn1 btn-secondary"
                  onClick={hanledRegister}
                >
                  {loading ? (
                    <div className="progess">
                      <CSpinner
                        color="light"
                        size="sm"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    </div>
                  ) : (
                    <label>Registrarse</label>
                  )}
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
              <div className="flex">
                <CFormInput
                  placeholder="password"
                  className="inpunt-login"
                  name="password"
                  type={mostrarPassword ? "text" : "password"}
                  value={dataLog.password}
                  onChange={handleChange}
                />
                <button
                  onClick={toggleMostrarPassword}
                  type="button"
                  className="btn1"
                  style={styles.btn}
                >
                  {mostrarPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
              <div className="conte-terminos">
                <div>
                  <input type="checkbox" checked />
                  <label className="color-gray">
                    Acepta términos y condiciones
                  </label>
                </div>
                <div>
                  <a href="/Lni9803g75E53U7Bg8xJz2xO+YrC/grPE/fxZ8GXSyuCtRzLqx6N782CTR03G99NLDfn6hadAE6M0TTOCHrlLdox0VWEY5o7eZ6OKBf28V7n+AEonVXxDk8VTGTjZVcJ">
                    <label>¿Olvido su contraseña?</label>
                  </a>
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
                      <CSpinner
                        color="light"
                        size="sm"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    </div>
                  ) : (
                    <label>Ingresar</label>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
