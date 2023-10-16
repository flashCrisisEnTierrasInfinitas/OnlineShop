import ProList from "./grid";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Filter from "./filter";
import { useState } from "react";

export default function CategoryProduct({
  allProducts,
  setAllproducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) {
  const { id } = useParams();
  const [idFilter,setIdFilter] = useState(id);
  console.log("🚀 ~ file: index.js:19 ~ idFilter:", idFilter)

  return (
    <div className="conter-home">
      <div className="header-pay">
        <Header id={id}/>
      </div>
      <div className="row">
        <div className="col-9 margin-90">
        <ProList
          allProducts={allProducts}
          setAllproducts={setAllproducts}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
          idFilter={idFilter}
          id={id}
        />
        </div>
      </div>
    </div>
  );
}
