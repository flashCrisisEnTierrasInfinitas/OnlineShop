import { Chip } from "@mui/material";
import Head from "./head";
import Result from "./resut";

export default function Factura({ data }) {
    return (
        <div className="conter-factura">
            <Head data={data} />
            <div className="resul-factura">
                <div>
                    <div className="codigo-factura">
                        <div>
                            <h5>N° Venta</h5>
                        </div>
                        <div className="precio-pro-fac">
                            <Chip label={data.id} />
                        </div>
                    </div>
                    <div className="codigo-factura top-20">
                        <div>
                            <h5>usuario:</h5>
                        </div>
                        <div className="precio-pro-fac">
                            <h5>{data.user_compra}</h5>
                        </div>
                    </div>
                    <div className="top-20">
                        <h6>PRODUCTOS:</h6>
                    </div>
                    <div>
                        <Result id={data.id} />
                    </div>
                </div>
            </div>
            <div className="subTotal-factura">
                <div>
                    <h5>SUBTOTAL</h5>
                </div>
                <div className="precio-pro-fac">
                    <h5>${data.Total_Pago}</h5>
                </div>
            </div>
        </div>
    );
}
