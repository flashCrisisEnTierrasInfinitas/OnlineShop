import { useState } from "react";
import ContedAdmin from "../components/Conter";
import New from "./new";
import Table from "./table";

export default function Category() {

  const [key, setKey]= useState(0)

  return (
    <ContedAdmin>
      <h1 className="title-module">CATEGORIA PRODUCTOS</h1>
      <div className="margin-90">
        <div className="conter-new">
          <New setKey={setKey} key={key}/>
        </div>
        <Table  setKey={setKey} key={key}/>
      </div>
    </ContedAdmin>
  );
}
