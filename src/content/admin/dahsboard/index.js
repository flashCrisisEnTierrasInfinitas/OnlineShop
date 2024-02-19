import { useParams } from "react-router";
import ContedAdmin from "../components/Conter.jsx";
import Components from "./conponest.jsx";

export default function DahsboardAdmin() {
  const { id } = useParams();
  return (
    <ContedAdmin>
      <h1 className="title-module">PEDIDOS DEL DIA</h1>
      <Components id={id} />
    </ContedAdmin>
  );
}
