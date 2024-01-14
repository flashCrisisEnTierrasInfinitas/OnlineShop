import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

export default function Table({ data, Total, setTotal, setAddShop, addShop }) {
  const dataToRender = data || [];
  const [inputValue, setInputValue] = useState([]);
  const valueToDisplay = Total ? Total.toLocaleString() : "";
  // Define un estado para el contador
  const [counter, setCounter] = useState(0);
  console.log("🚀 ~ Table ~ counter:", counter);

  // Define la función que se encargará de actualizar el contador
  const updateCounter = ({ increment }) => {
    setCounter(increment);
  };

  // Supongamos que dataToRender es un array de objetos con propiedades, y quieres mapear alguna propiedad en inputValue
  useEffect(() => {
    const initializedInputValue = dataToRender.reduce((acc, product) => {
      acc[product.id] = product.quantity;
      return acc;
    }, {});

    setInputValue(initializedInputValue);
  }, [dataToRender]);

  const isPositiveNumber = (value) => {
    return /^[1-9]\d*$/.test(value);
  };

  const handleInputChange = (event, productId) => {
    const inputValue = event.target.value;

    if (isPositiveNumber(inputValue)) {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        [productId]: parseInt(inputValue, 10),
      }));
    }
  };

  const Totals = ({ product }) => {
    const { precioPro, quantity } = product;
    const total = precioPro * quantity;
    return total.toLocaleString("es-CO");
  };

  const removeFromCart = (productId) => {
    const updatedCart = addShop.filter((product) => product.id !== productId);
    setAddShop(updatedCart);

    const newTotal = updatedCart.reduce(
      (acc, product) => acc + product.precioPro * product.quantity,
      0
    );
    setTotal(newTotal);
    window.location.reload();
  };

  const AddShoppingCart = (data) => {
    // Asegúrate de que 'productos' exista y sea un array

    // Verifica si el producto ya está en el carrito
    const productoExistente = addShop.find(
      (producto) => producto.id === data.id
    );

    if (productoExistente) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      productoExistente.quantity = inputValue[data.id];
    } else {
      // Si el producto no está en el carrito, agrégalo
      addShop.push({
        ...data,
        quantity: inputValue[data.id],
      });
    }
    updateCounter(inputValue);
    // Actualiza el total sumando el precio del nuevo producto
    //addShop.total += data.precioPro;
    // Calcula el nuevo total sumando el precio de todos los productos en el carrito
    const nuevoTotal = addShop.reduce(
      (total, product) => total + product.precioPro * product.quantity,
      0
    );

    // Actualiza el estado del total
    setTotal(nuevoTotal);
    setAddShop([...addShop]);
    window.location.reload();
  };
  return (
    <div>
      {dataToRender.map((val) => (
        <div className="table-shop">
          <div className="nombre-shop">
            <div className="img-shop">
              <img src={val.img} alt={val.nombre} />
            </div>
            <div className="text-nombre-shop">
              <p>{val.descripPro}</p>
            </div>
          </div>
          <div className="nombre-shop">
            Precio: ${val.precioPro.toLocaleString("es-CO")}
          </div>
          <div className="nombre-shop">
            Cantidad:
            <input
              type="number"
              className="input-quantity"
              value={inputValue[val.id] || ""}
              onChange={(event) => handleInputChange(event, val.id)}
            />
          </div>
          <div className="nombre-shop">
            Total: $<Totals product={val} />
          </div>
          <div className="text-nombre-shop">
            <button onClick={() => AddShoppingCart(val)}>Actualizar</button>
            <button onClick={() => removeFromCart(val.id)}>Quitar</button>
          </div>
        </div>
      ))}
      <div className="grid top-50">
        <div></div>
        <div>
          <div className="info-shop">Subtotal: ${valueToDisplay}</div>
          <div className="info-shop">
            <label>
              En la pantalla de pagos se incluye el impuesto y se calculan los
              gastos de envío.
            </label>
          </div>
          <div className="grid">
            <a href="/">
              <Button
                style={{
                  background: "#2D477C",
                  width: "100%",
                  color: "#fff",
                }}
              >
                Seguir comprando
              </Button>
            </a>
            <a href="/ZeKqxkrThE4FooASf8FMC/0HAefmTli6V1MVBq09hqQXCwLNp22ESEd4pdKH5xiL">
              <Button
                style={{
                  background: "#FF6333",
                  width: "100%",
                  color: "#fff",
                }}
              >
                Finalizar pedido
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
