import Header from "./Header";
import Table from "./table";

export default function Notificaciones({Seccion,token,setContNotifi}) {
  return (
    <>
      <div className="header-pay">
        <Header />
      </div>
      <Table Seccion={Seccion} token={token} setContNotifi={setContNotifi}/>
    </>
  );
}
