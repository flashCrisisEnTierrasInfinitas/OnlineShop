// Importamos los elementos necesarios de react-router-dom
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

// Creamos nuestro componente para la ruta protegida
function protectedUser() {
  // Obtenemos el token del LocalStorage

  var getToken = Cookies.get("token");
  var role = Cookies.get("role");

  const decryptedText = role;
  // Verificamos si el usuario está autenticado
  let isLogged = getToken;
  const hasPermission = decryptedText === "0";

  // Si el usuario no está autenticado, redireccionamos a la página de inicio de sesión
  if (!isLogged) {
    return (
      <Navigate to="/au5Z4YhReMcxh1r0WdbGNrGiMU7+j6CfaUrMxP2TGJNv7ZgI72muOl1gie2Lc7da" />
    );
  }

  // Si el usuario está autenticado, mostramos el contenido de la ruta protegida
  return <Outlet />;
}

// Exportamos el componente
export default protectedUser;
