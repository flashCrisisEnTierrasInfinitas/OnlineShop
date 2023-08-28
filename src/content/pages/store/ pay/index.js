import Header from "./Header";
import Conted from "./conted";

export default function Pay({
    setAllproducts,
    setCountProducts,
    total,
    setTotal
}) {

    return (
        <div className="conter-home">
            <div className="header-pay">
                <Header />
            </div>
            <Conted
                total={total}
                setAllproducts={setAllproducts}
                setCountProducts={setCountProducts}
                setTotal={setTotal}
            />
        </div>

    )
}