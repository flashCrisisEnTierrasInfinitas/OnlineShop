import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import { CSpinner } from "@coreui/react";
import axios from "axios";
import WestIcon from "@mui/icons-material/West";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Tooltip } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Cookies from "js-cookie";

export default function DetalleProduc({Seccion}) {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState(1);
  const [loading, setLoading] = useState(true);
  const [LoadingBotton, setLoadingBotton] = useState(false);
  const { id } = useParams();
  const [validate, setValidate] = useState(false);
  var token = Cookies.get("token");

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
    return /^[1-9]\d*$/.test(value);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (isPositiveNumber(inputValue)) {
      setInputValue(inputValue);
    }
  };

  const onAddProduct = async (product) => {
    const { id, precioPro, img, nombrePro } = product;

    const formData = {
      user: Seccion,
      idPro: id,
      cantidad: inputValue,
      precio: precioPro,
      img: img,
      nombre: nombrePro,
    };

    try {
      setLoadingBotton(true);
      const response = await axios.post("/shopss", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      setLoadingBotton(false);
      setValidate(true);
      setValidate(response.data.data.id);
      return response;
    } catch (error) {
      setLoadingBotton(false);
      return alert(error);
    }
  };

  const UpdateProduct = async () => {
    const formData = {
      cantidad: inputValue,
    };
    try {
      setLoadingBotton(true);
      const response = await axios.put(`/shopss/${validate}`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
      });
      setValidate(response.data.data.id);
      setLoadingBotton(false);
      return response;
    } catch (error) {
      setLoadingBotton(false);
      return alert(error);
    }
  };

  return (
    <div className="conter-detallepro">
      <header>
        <div className="grid">
          <div>
            <div className="img-detalle">
              <div className="ico-detalle">
                <a href="/">
                  <WestIcon />
                </a>
              </div>
              <img src={data.img} alt={data.nombrePro} />
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
            <p className="text-detalle">Stock:{data.stockPro}</p>
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
              ) : validate ? (
                <Tooltip title="Agregar al carrito">
                  <Button
                    style={{
                      background: "#FF6333",
                      width: "100%",
                    }}
                    variant="contained"
                    onClick={() => UpdateProduct(data)}
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
                        Agregar
                      </>
                    )}
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Agregar al carrito">
                  <Button
                    style={{
                      background: "#FF6333",
                      width: "100%",
                    }}
                    variant="contained"
                    onClick={() => onAddProduct(data)}
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
                <a href="/shop">ver carrito</a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
