import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import { CSpinner } from "@coreui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Tooltip } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

export default function DetalleProduc({
  addShop,
  Total,
  setAddShop,
  setTotal,
}) {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState(1);
  const [loading, setLoading] = useState(true);
  const [LoadingBotton, setLoadingBotton] = useState(false);
  const { id } = useParams();
  const [validate, setValidate] = useState(false);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/product/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getDataList();
  }, [getDataList]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "30vh" }}
      >
        <CSpinner color="danger" />
      </div>
    );
  }

  const isPositiveNumber = (value) => {
    return /^[1-9]\d*$/.test(value.toString());
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (newValue === "" || isPositiveNumber(newValue)) {
      setInputValue(newValue);
    }
  };

  const AddShoppingCart = (data) => {
    // Asegúrate de que 'productos' exista y sea un array

    // Verifica si el producto ya está en el carrito
    const productoExistente = addShop.find(
      (producto) => producto.id === data.id
    );

    if (data.stockPro < inputValue) {
      // Si el producto no está en el carrito y no hay suficiente stock, muestra una alerta
      return alert("sin stock");
    }

    if (productoExistente) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      productoExistente.quantity = parseInt(inputValue, 10);
    } else {
      // Si el producto no está en el carrito, agrégalo
      addShop.push({
        ...data,
        quantity: parseInt(inputValue, 10),
      });
    }

    // Calcula el nuevo total sumando el precio de todos los productos en el carrito
    const nuevoTotal = addShop.reduce(
      (total, product) => total + product.precioPro * product.quantity,
      0
    );

    // Actualiza el estado del total
    setTotal(nuevoTotal);

    setValidate(true);
    setAddShop([...addShop]);
  };

  const Peso = ({ value }) => {
    if (value === "un") {
      return "Unidades";
    }
    if (value === "lb") {
      return "Libras";
    }
    if (value === "kg") {
      return "Kilos";
    }
    if (value === "g") {
      return "Gramos";
    }
    if (value === "arr") {
      return "Arroba";
    }
    if (value === "do") {
      return "docenas";
    }
    if (value === "lt") {
      return "Litros";
    }
  };

  const Presentacion = ({ value }) => {
    if (value === "un") {
      return "Unidades";
    }
    if (value === "cj") {
      return "Cajas";
    }
    if (value === "paq") {
      return "Paquetes";
    }
    if (value === "cube") {
      return "Cubeta";
    }
    if (value === "doce") {
      return "Docena";
    }
    if (value === "btl") {
      return "Bulto";
    }
    if (value === "can") {
      return "Canasta";
    }
    if (value === "bto") {
      return "Botella";
    }
  };

  return (
    <section class="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
      <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full px-4 md:w-1/2 ">
            <div class="sticky top-0 z-50 overflow-hidden ">
              <div class="relative mb-6 lg:mb-10 lg:h-2/4 ">
                <img
                  src={data.img}
                  alt={data.nombrePro}
                  class="object-cover w-full lg:h-full "
                />
              </div>
              <div class="flex-wrap hidden md:flex ">
                <div class="w-1/2 p-2 sm:w-1/4">
                  <a
                    href="#"
                    class="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                  >
                    <img
                      src={data.img}
                      alt={data.nombrePro}
                      class="object-cover w-full lg:h-20"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-4 md:w-1/2 ">
            <div class="lg:pl-20">
              <div class="mb-8 ">
                <span class="text-lg font-medium text-rose-500 dark:text-rose-200">
                  New
                </span>
                <h2 class="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                  {data.nombrePro}
                </h2>
                <div class="flex items-center mb-6">
                  <ul class="flex mr-2">
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                  <p class="text-xs dark:text-gray-400 ">
                    (2 customer reviews)
                  </p>
                </div>
                <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                  {data.descripPro}
                </p>
                <p class="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                  <span>${data.precioPro.toLocaleString("es-CO")}</span>
                  <span class="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                    ${data.precioPro.toLocaleString("es-CO")}
                  </span>
                </p>
                <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                  Cantidades, <Peso value={data.peso} />
                </p>
                <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                  Presentación, <Presentacion value={data.Presentacion} />{" "}
                </p>
              </div>
              <div class="flex items-center mb-8 ">
                <label
                  for=""
                  class="w-full text-xl font-semibold text-gray-700 dark:text-gray-400"
                >
                  Quantity:
                </label>
                <div class="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                  <input
                    type="number"
                    onChange={handleInputChange}
                    className="input-quantity"
                    value={inputValue}
                  />
                </div>
              </div>
              <div class="flex flex-wrap items-center -mx-4 ">
                {data.stockPro == 0 ? (
                  ""
                ) : (
                  <Tooltip title="Agregar al carrito">
                    <Button
                      style={{
                        background: "#FF6333",
                        width: "100%",
                      }}
                      variant="contained"
                      onClick={() => AddShoppingCart(data)}
                    >
                      {LoadingBotton ? (
                        <div className="progess">
                          <CSpinner
                            color="light"
                            size="sm"
                            style={{ width: "1rem", height: "1rem" }}
                          />
                        </div>
                      ) : (
                        <>
                          <LocalGroceryStoreIcon />
                          Agregar a carrito
                        </>
                      )}
                    </Button>
                  </Tooltip>
                )}
                {validate ? (
                  <div className="check">
                    <CheckCircleOutlineIcon />
                    <label>Se ha agregado este producto,</label>
                    <a href="/7Abq5P7EeFQM7HGxE/cDsMvM5/jPk1ZIuzGwbnuVyYI+f9RUtVrP4wVLaqftHwM/">
                      ver carrito
                    </a>
                    <a href="/">,o seguir comprando.</a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
