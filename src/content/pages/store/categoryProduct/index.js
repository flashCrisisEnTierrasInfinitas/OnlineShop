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
  const { filter, setFilter } = useState([]);

  localStorage.setItem("key", id);
  const key = localStorage.getItem("key");

  return (
    <div className="conter-home">
      <div className="header-pay">
        <Header />
      </div>
      <div className="flex">
        <div>
          <Filter setFilter={setFilter} filter={filter} id={id}/>
        </div>
        <ProList
          id={id}
          key={key}
          allProducts={allProducts}
          setAllproducts={setAllproducts}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
        />
      </div>
    </div>
  );
}
