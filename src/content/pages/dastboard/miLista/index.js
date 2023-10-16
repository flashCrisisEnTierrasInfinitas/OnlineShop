import Header from "./Header";
import Table from "./table";

export default function MiLista({seccion,token}) {
  return (
    <>
      <div className="header-pay">
        <Header />
      </div>
      <Table seccion={seccion}token={token}/>
    </>
  );
}
