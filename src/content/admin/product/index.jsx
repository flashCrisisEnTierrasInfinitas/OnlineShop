import ContedAdmin from "../components/Conter";
import Table from "./table";

export default function Product() {
  return (
    <ContedAdmin>
      <h1>Usuarios</h1>
      <div className="margin-90">
        <button className="btn1 btn-primary">Nuevo</button>
        <Table />
      </div>
    </ContedAdmin>
  );
}
