import FooterMenu from "../../../components/footer-menu";
import Header from "./Header";
import ProList from "./ProList";

export default function Home({
  allProducts,
  setAllproducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) {
  return (
    <div className="mt-10">
      <Header />
      <ProList
        allProducts={allProducts}
        setAllproducts={setAllproducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
      <FooterMenu />
    </div>
  );
}
