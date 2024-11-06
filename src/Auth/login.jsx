import { CFormInput, CSpinner } from "@coreui/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

function useSafeNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  const safeNavigate = (path) => {
    if (location.pathname === "/") {
      // Si estás en la página de inicio, navega a otra página de tu elección
      navigate(path);
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
  const [auth, setAuth] = useState(true);

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
  const Sing = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/auth/login", dataLog);
      console.log(response.data);
      setToken(response.data.access_token);
      setRole(response.data.role);
      setSeccion(response.data.seccion);
      setId(response.data.id);
      setImg(response.data.img);
      setLoading(false);
      setAuth(true);
      if (response.data.role === 1) {
        return setAuth(false);
      }
      goToEntry();
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

  const hanledRegister = async (e) => {
    e.preventDefault();
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

  return log ? (
    <div class="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div class="text-center mb-12">
          <a href="javascript:void(0)">
            <img
              src="/img/logos/logoVerde.jpeg"
              alt="logo"
              class="w-40 inline-block"
            />
          </a>
        </div>

        <form onSubmit={hanledRegister}>
          <div class="space-y-6">
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Nombre</label>
              <input
                class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Ingrese su nombre"
                type="text"
                name="name"
                value={dataLog.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">
                Correo Electronico
              </label>
              <input
                class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Ingrese Correo Electronico"
                type="email"
                name="email"
                value={dataLog.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Contraseña</label>
              <input
                class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Ingrese Contraseña"
                name="password"
                type={mostrarPassword ? "text" : "password"}
                value={dataLog.password}
                onChange={handleChange}
                required
              />
            </div>
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="text-gray-800 ml-3 block text-sm">
                Acepto los
                <a
                  href="javascript:void(0);"
                  class="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Términos y Condiciones
                </a>
              </label>
            </div>
          </div>

          <div class="!mt-12">
            <button
              type="submit"
              class="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
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
                "Crear una cuenta"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div class="bg-gray-50 font-[sans-serif]">
      <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div class="max-w-md w-full">
          <a href="javascript:void(0)">
            <img
              src="/img/logos/logoAzul.jpeg"
              alt="logo"
              class="w-40 mb-8 mx-auto block"
            />
          </a>

          <div class="p-8 rounded-2xl bg-white shadow">
            <h2 class="text-gray-800 text-center text-2xl font-bold">
              Iniciar sesión
            </h2>
            <form class="mt-8 space-y-4" onSubmit={Sing}>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">
                  Nombre de usuario
                </label>
                <div class="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user name"
                    value={dataLog.email}
                    onChange={handleChange}
                    required={true}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    class="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              {auth ? (
                ""
              ) : (
                <div role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Info
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-2 py-0 text-red-700">
                    <p>No autorizado.</p>
                  </div>
                </div>
              )}
              <div>
                <label class="text-gray-800 text-sm mb-2 block">
                  Contraseña
                </label>
                <div class="relative flex items-center">
                  <input
                    name="password"
                    type={mostrarPassword ? "text" : "password"}
                    required
                    value={dataLog.password}
                    onChange={handleChange}
                    class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                  <svg
                    onClick={toggleMostrarPassword}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    class="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember-me"
                    class="ml-3 block text-sm text-gray-800"
                  >
                    Acuérdate de mí
                  </label>
                </div>
                <div class="text-sm">
                  <a
                    href="/Lni9803g75E53U7Bg8xJz2xO+YrC/grPE/fxZ8GXSyuCtRzLqx6N782CTR03G99NLDfn6hadAE6M0TTOCHrlLdox0VWEY5o7eZ6OKBf28V7n+AEonVXxDk8VTGTjZVcJ"
                    class="text-blue-600 hover:underline font-semibold"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div class="!mt-8">
                <button
                  type="submit"
                  class="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
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
                    "Iniciar sesión"
                  )}
                </button>
              </div>
              <p class="text-gray-800 text-sm !mt-8 text-center">
                ¿No tienes una cuenta?
                <button
                  type="button"
                  onClick={() => setLog(true)}
                  class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Regístrate aquí
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
