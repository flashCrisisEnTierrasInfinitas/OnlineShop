import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import { CSpinner } from "@coreui/react";
import axios from "axios";
import Alert from "@mui/joy/Alert";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import WarningIcon from "@mui/icons-material/Warning";
import Close from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

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
        <div>
          <Alert
            size="lg"
            color="success"
            variant="solid"
            invertedColors
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                  boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
                }}
              >
                <div>
                  <WarningIcon fontSize="xl2" />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                variant="plain"
                sx={{
                  "--IconButton-size": "32px",
                  transform: "translate(0.5rem, -0.5rem)",
                }}
              >
                <Close />
              </IconButton>
            }
            sx={{ alignItems: "flex-start", overflow: "hidden" }}
          >
            <div>
              <Typography level="title-lg">Warning</Typography>
              <Typography>
                Este producto se cobra por peso. El precio total en esta orden
                es estimado y dependerá del peso final al momento de preparar su
                orden.
              </Typography>
            </div>
          </Alert>
        </div>
        <h1 className="title-detalle">{data.nombrePro}</h1>
        <p className="text-detalle">1 lb</p>
        <p className="text-detalle">
          ${data.precioPro.toLocaleString("es-CO")}
        </p>
      </header>
      <div className="img-detalle">
        <img src={data.img} alt={data.nombrePro} />
      </div>
      <div className="descrip-detalle">
        <h3 className="color-gray">{data.descripPro}</h3>
      </div>
      <div className="boton-detalle">
        <button className="btn1 btn-primary" onClick={() => onAddProduct(data)}>Agregar al Carrito</button>
      </div>
    </div>
  );
}
