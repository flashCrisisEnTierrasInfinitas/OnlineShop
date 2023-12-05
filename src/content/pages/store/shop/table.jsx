export default function Table({ data }) {
    console.log("🚀 ~ file: table.jsx:2 ~ Table ~ data:", data)

    const Total = ({ precio, cantidad }) => {
        const total = precio * cantidad;
        console.log(total++)
        return total.toLocaleString("es-CO");
    }




    return (
        <div>
            {data.map(val => (
                <div className="table-shop">
                    <div className="nombre-shop">
                        <div className="img-shop">
                            <img src={val.img} alt={val.nombre} />
                        </div>
                        <div className="text-nombre-shop">
                            <p>{val.nombre}</p>
                            <button>Quitar</button>
                        </div>
                    </div>
                    <div className="nombre-shop">
                        Precio:<br />
                        $
                        {val.precio.toLocaleString("es-CO")}
                    </div>
                    <div className="nombre-shop">
                        Cantidad:
                        <input
                            type="number"
                            className="input-quantity"
                            value={val.cantidad}
                        />
                    </div>
                    <div className="nombre-shop">
                        Total:
                        <br />
                        $
                        <Total
                            precio={val.precio}
                            cantidad={val.cantidad}
                        />
                    </div>
                </div>
            ))}
            <div>
                <label>Subtotal </label>
                <label></label>
            </div>
        </div>
    )
}