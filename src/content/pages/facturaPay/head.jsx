export default function Head({ data }) {
    return (
        <div className="head-factura">
            <div className="img-factura">
                <img src="/img/logos/logo1.png" alt="" />
            </div>
            <div className="fecha-factura">
                <label>{new Date(data.created_at).toLocaleString()}</label>
            </div>
        </div>
    )
}