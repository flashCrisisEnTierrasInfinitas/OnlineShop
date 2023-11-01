import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import { CSpinner } from "@coreui/react";
import axios from "axios";
import WestIcon from "@mui/icons-material/West";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Tooltip } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

export default function DetalleProduc({
  allProducts,
  setAllproducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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
      setError(err);
      setLoading(false);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getDataList();
  }, [getDataList]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }

  const onAddProduct = (product) => {
    const IndexCarrito = allProducts.findIndex(
      (item) => item.id === product.id
    );

    if (
      allProducts.length > 0 && allProducts[IndexCarrito]?.quantity
        ? allProducts[IndexCarrito].quantity + 1
        : 1
    ) {
      if (product.stockPro == allProducts[IndexCarrito]?.quantity) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        return Toast.fire({
          icon: "error",
          title: "No Stock",
        });
      }
    }

    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.precioPro * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllproducts([...products]);
    }

    setTotal(total + product.precioPro * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllproducts([...allProducts, product]);
  };

  return (
    <div className="conter-detallepro">
      <header>
        <div className="img-detalle">
          <div className="ico-detalle">
            <a href="/">
              <WestIcon />
            </a>
          </div>
          <img src={data.img} alt={data.nombrePro} />
        </div>
        <h1 className="title-detalle">{data.nombrePro}</h1>
        <p className="text-detalle">
          <strong>Cantidad:</strong>
          {countProducts}
        </p>
        <p className="text-detalle">
          <strong>Stock:</strong> {data.stockPro}
        </p>
        <p className="text-detalle">
          <strong>Precio:</strong> ${data.precioPro.toLocaleString("es-CO")}
        </p>
      </header>

      <div className="descrip-detalle">
        <h3 className="color-gray">{data.descripPro}</h3>
      </div>
      <div className="boton-detalle">
        {data.stockPro == 0 ? (
          ""
        ) : (
          <Tooltip title="Agregar al carrito">
            <Button variant="contained" onClick={() => onAddProduct(data)}>
              <LocalGroceryStoreIcon />
              Agregar
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
