import { CFormInput, CSpinner } from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import LoupeIcon from "@mui/icons-material/Loupe";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Tooltip, Button } from "@mui/material";
import Swal from "sweetalert2";

export default function ProList({
  allProducts,
  setAllproducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
  idFilter,
  id
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/listCategoriPro/${id}`, {
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

  const filteredData = data?.filter((item) =>
    item.nombrePro?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //!
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
    <div className="margin-90 conter-pro">
      <div className="conter-search">
        <CFormInput
          placeholder="¿Qué estás buscando?"
          className="input-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
      <div className="box-vendido">
          {filteredData?.map((product) => (
            <>
              <div className="card-pro-list">
                <Card key={product.id}>
                  <div>
                    <h1 className="title-card-list">{product.nombrePro}</h1>
                    <IconButton
                      aria-label="bookmark Bahamas Islands"
                      variant="plain"
                      color="neutral"
                      size="sm"
                      sx={{
                        position: "absolute",
                        top: "0.875rem",
                        right: "0.5rem",
                      }}
                    >
                      <BookmarkAdd />
                    </IconButton>
                  </div>
                  <AspectRatio minHeight="120px" maxHeight="400px">
                    <img
                      src={product.img}
                      srcSet={product.img}
                      loading="lazy"
                      alt={product.nombrePro}
                    />
                  </AspectRatio>
                  <div className="grid">
                    <div className="text-product">
                      <Typography level="body-xs">Total price:</Typography>
                      <Typography fontSize="lg" fontWeight="lg">
                        ${product.precioPro.toLocaleString("es-CO")}
                      </Typography>
                    </div>
                    <div className="text-product">
                      <Typography level="body-xs">Total Stock:</Typography>
                      <Typography fontSize="lg" fontWeight="lg">
                        {product.stockPro}
                      </Typography>
                    </div>
                    <div className="flex boton-product">
                      {product.stockPro == 0 ? (
                        ''
                      ) : (<Tooltip title="Agregar al carrito">
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => onAddProduct(product)}
                        >
                          <AddShoppingCartIcon />
                        </Button>
                      </Tooltip>)}
                      <Tooltip title="Ver detalle">
                        <a href={`/DetalleProduc/${product.id}`}>
                          <Button variant="contained">
                            <LoupeIcon />
                          </Button>
                        </a>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
