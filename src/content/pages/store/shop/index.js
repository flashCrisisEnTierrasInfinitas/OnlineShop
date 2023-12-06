import Table from "./table";

export default function Shop({ Seccion, Total, setTotal, setAddShop,addShop }) {
  const datas = localStorage.getItem("addShop");
  const productos = JSON.parse(datas);

  return (
    <div className="conter-detallepro margin-90">
      <div className="flex">
        <h2>Mi carrito</h2>
      </div>
      <Table
        data={productos}
        Total={Total}
        setTotal={setTotal}
        setAddShop={setAddShop}
        addShop={addShop}
      />
    </div>
  );
}
