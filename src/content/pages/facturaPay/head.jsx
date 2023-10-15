export default function Head({ data }) {
    return (
        <div className="head-factura">
            <h1>ASUPRO</h1>
            <p>Colombia</p>

            <div className="fecha-factura">
                <label>{new Date(data.created_at).toLocaleString()}</label>
            </div>
        </div>
    )
}