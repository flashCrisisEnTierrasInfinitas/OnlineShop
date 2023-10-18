import ContedAdmin from "../components/Conter";
import Components from "./conponest.jsx";
import Toast from "./toast";

export default function DahsboardAdmin() {
  return (
    <ContedAdmin>
      <h1 className="title-module">PEDIDOS DEL DIA</h1>
      <Components />
    </ContedAdmin>
  );
}
