import Conted from "./Conted";
import Header from "./Header";
import ProList from "./ProList";
import BasicModal from "./modasl";

export default function Home({
    allProducts,
    setAllproducts,
    countProducts,
    setCountProducts,
    total,
    setTotal
}) {

    return (
        <div className="conter-home">
            <BasicModal/>
            <Conted />
            <Header />
            <ProList
                allProducts={allProducts}
                setAllproducts={setAllproducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts} />
        </div>
    )
}