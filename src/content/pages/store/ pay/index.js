import Cookies from "js-cookie";
import Header from "./Header";
import Conted from "./conted";

export default function Pay({
    Total,
    setTotal,
    Seccion,
    addShop,
    setAddShop
}) {
    var token = Cookies.get('token');
    return (
        <div className="conter-home">
            <div className="header-pay">
                <Header /> 
            </div>
            <Conted
                Total={Total}
                setTotal={setTotal}
                token={token}
                Seccion={Seccion}
                addShop={addShop}
                setAddShop={setAddShop}
            />
        </div>

    )
}