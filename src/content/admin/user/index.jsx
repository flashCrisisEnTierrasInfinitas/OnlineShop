import ContedAdmin from "../components/Conter";
import Table from "./table";

export default function User() {
  return (
    <ContedAdmin>
      <h1>Usuarios</h1>
      <div className="margin-90">
        <Table />
      </div>
    </ContedAdmin>
  );
}
