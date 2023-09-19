import ContedAdmin from "../components/Conter";
import Table from "./table";
import New from './new';

export default function User() {
  return (
    <ContedAdmin>
      <h1 className="title-module">USUARIOS</h1>
      <div className="margin-90">
      <div className="conter-new">
          <New />
        </div>
        <Table />
      </div>
    </ContedAdmin>
  );
}
