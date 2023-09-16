import ContedAdmin from "../components/Conter";
import New from "./new";
import Table from "./table";

export default function Product() {
  return (
    <ContedAdmin>
      <h1>Usuarios</h1>
      <div className="margin-90">
        <New/>
        <Table />
      </div>
    </ContedAdmin>
  );
}
