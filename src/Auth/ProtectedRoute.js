// Importamos los elementos necesarios de react-router-dom
import { Navigate, Outlet } from "react-router-dom";

// Creamos nuestro componente para la ruta protegida
function protectedRoute() {
  // Obtenemos el token del LocalStorage

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("rol");

  const decryptedText = atob(role);
  // Verificamos si el usuario está autenticado
  let isLogged = token;
  const hasPermission = decryptedText === "1";


  // Si el usuario no está autenticado, redireccionamos a la página de inicio de sesión
  if (!isLogged) {
    return <Navigate to="/login" />;
  }
  if (!hasPermission) {
    return <Navigate to="/store" />; // O puedes retornar otro componente para indicar que no tiene permiso
  }
  // Si el usuario está autenticado, mostramos el contenido de la ruta protegida
  return <Outlet />;
}

// Exportamos el componente
export default protectedRoute;