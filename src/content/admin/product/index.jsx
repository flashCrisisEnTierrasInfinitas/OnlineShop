import ContedAdmin from "../components/Conter";
import New from "./new";
import Table from "./table";

export default function Product() {
  return (
    <ContedAdmin>
      <h1 className="title-module">LISTA PRODUCTOS</h1>
      <div className="margin-90">
        <div className="conter-new">
          <New />
        </div>
        <Table />
      </div>
    </ContedAdmin>
  );
}
