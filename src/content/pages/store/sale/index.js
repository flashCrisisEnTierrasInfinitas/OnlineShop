import Form from "./form";

export default function Sale({Seccion,token ,setAddShop,setTotal,Total,addShop}) {
  return (
    <div className="conter-detallepro margin-90">
      <div className="flex">
        <h3 className="color-gray">Pantalla de pagos</h3>
      </div>
      <div className="margin-90">
        <Form Seccion={Seccion} token={token} setAddShop={setAddShop} setTotal={setTotal} Total={Total} addShop={addShop}/>
      </div>
    </div>
  );
}
