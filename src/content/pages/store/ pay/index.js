import Cookies from "js-cookie";
import Header from "./Header";
import Conted from "./conted";

export default function Pay({
    setAllproducts,
    setCountProducts,
    total,
    setTotal,
    allProducts
}) {
    var token = Cookies.get('token');
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
                token={token}
                allProducts={allProducts}
            />
        </div>

    )
}