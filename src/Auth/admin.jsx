import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { CSpinner } from "@coreui/react";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [seccion, setSeccion] = useState("");
  const [id, setId] = useState("");
  const [img, setImg] = useState("");
  const [auht, setAuth] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/auth/login", formData);
      setToken(response.data.access_token);
      setRole(response.data.role);
      setSeccion(response.data.seccion);
      setId(response.data.id);
      setImg(response.data.img);
      setLoading(false);

      if (response.data.role === 1) {
        return (window.location.href = "/dahsboard/0");
      } else {
        return setAuth(false);
      }
    } catch (error) {
      setLoading(false);
      return alert(error.response.data.error);
    }
  };

  const Cooki = () => {
    Cookies.set("token", token, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
    Cookies.set("role", role, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
    Cookies.set("seccion", seccion, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
    Cookies.set("id", id, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
    Cookies.set("img", img, { expires: 1 }); // Almacena el token en una cookie con una duración de 1 día
  };
  Cooki();
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuth(true);
    }, 1000); // Cambia 5000 a la cantidad de milisegundos que desees

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/">
          {" "}
          <img
            className="mx-auto h-10 w-auto"
            src="/img/logos/logo1.png"
            alt="Your Company"
          />
        </a>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in Admin
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {auht ? (
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-blue-900 hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                " Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
