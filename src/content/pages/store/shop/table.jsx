import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <section class="flex items-center bg-gray-50 xl:h-screen font-poppins">
      <div class="justify-center flex-1 px-1 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
        <h2 class="mb-10 text-4xl font-bold text-center dark:text-gray-400">
          Compras Asupro
        </h2>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-8/12">
            <div class="px-10">
              {dataToRender.map((val) => (
                <div class="relative flex flex-wrap items-center pb-8 mb-8 -mx-4 border-b border-gray-200 dark:border-gray-700 xl:justify-between border-opacity-40">
                  <div class="w-full mb-2 lg:mb-0 h-96 md:h-44 md:w-44">
                    <img
                      src={val.img}
                      alt={val.nombre}
                      class="object-cover w-full h-full"
                    />
                  </div>
                  <div class="w-full px-4 mb-6 md:w-auto xl:mb-0">
                    <p class="block mb-5 text-xl font-medium hover:underline">
                      {val.nombrePro}
                    </p>
                    <div class="flex flex-wrap">
                      <p class="mr-4 text-sm font-medium">
                        <span class="dark:text-gray-400">Precio:</span>
                        <span class="ml-2 text-gray-400 dark:text-gray-400">
                          ${val.precioPro.toLocaleString("es-CO")}
                        </span>
                      </p>
                      <p class="text-sm font-medium dark:text-gray-400">
                        <span>Cantidad:</span>
                        <span class="ml-2 text-gray-400">{val.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <div class="w-full px-4 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0">
                    <div class="flex items-center">
                      <h4 class="mr-4 font-medium dark:text-gray-400">Qty:</h4>
                      <div class="inline-flex items-center px-4">
                        <input
                          type="number"
                          className="input-quantity"
                          value={inputValue[val.id] || ""}
                          onChange={(event) => handleInputChange(event, val.id)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="w-full px-4 xl:w-auto">
                    <span class="text-xl font-medium text-blue-500 dark:text-gray-400 ">
                      <span class="text-sm">Total,$ </span>
                      <span>
                        <Totals product={val} />
                      </span>
                    </span>
                  </div>
                  <div className="text-nombre-shop">
                    <button onClick={() => AddShoppingCart(val)}>
                      Actualizar
                    </button>
                    <button onClick={() => removeFromCart(val.id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="w-full lg:w-4/12">
            <div class="px-6 mb-14">
              <div>
                <h2 class="mb-6 text-3xl font-bold dark:text-gray-400">
                  Total
                </h2>
                <div class="flex items-center justify-between px-10 py-4 mb-6 font-medium leading-8 bg-gray-100  dark:border-gray-800 rounded-xl">
                  <span>Total:</span>
                  <span class="flex items-center text-xl">
                    <span class="mr-2 text-base">$</span>
                    <span>{valueToDisplay}</span>
                  </span>
                </div>
                <div class="flex items-center justify-between px-10 py-4 mb-6 font-medium leading-8 bg-gray-100  dark:text-gray-400  dark:border-gray-800 rounded-xl">
                  <span>
                    En la pantalla de pagos se incluye el impuesto y se calculan
                    los gastos de envío
                  </span>
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
                      continuar
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
