import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import { CSpinner } from "@coreui/react";
import axios from "axios";
import WestIcon from "@mui/icons-material/West";
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

  return (
    <div className="conter-detallepro">
      <header>
        <div className="grid">
          <div>
            <div className="img-detalle">
              <img
                src={data.img}
                alt={data.nombrePro}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
          <div>
            <h1 className="title-detalle">{data.nombrePro}</h1>
            <div className="descrip-detalle">
              <h3 className="color-gray">{data.descripPro}</h3>
            </div>
            <p className="text-detalle">
              Precio: ${data.precioPro.toLocaleString("es-CO")}
            </p>
            <p className="text-detalle">Presentación: {data.Presentacion} </p>
            <div className="grid">
              <div className="flex">
                Cantidad:
                <input
                  type="number"
                  onChange={handleInputChange}
                  className="input-quantity"
                  value={inputValue}
                />
              </div>
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
            </div>
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
        <div className="top-50"></div>
      </header>
    </div>
  );
}
