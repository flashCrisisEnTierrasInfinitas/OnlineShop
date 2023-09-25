import {
  CFormInput,
  CSpinner,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import isMountedRef from '../../../hooks/useRefMounted';
import Sliders from "./slider";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import LoupeIcon from '@mui/icons-material/Loupe';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Tooltip,Button } from "@mui/material";

export default function ProList({
  allProducts,
  setAllproducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) {
  const [searchTerm, setSearchTerm] = useState("");


  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/product`, {
        headers: {
          'Content-Type': 'multipart/form-data'
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
    )
  }


  const filteredData = data?.filter((item) =>
    item.nombrePro?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onAddProduct = (product) => {
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

  const Sale = (product) => {
    onAddProduct(product);
    return window.location.replace("/pay");
  };

  const Validate = ({ product }) => {
    if (allProducts.length > 0 && allProducts[0].quantity !== undefined) {
      console.table(product.stockPro);
      console.table(allProducts[0].quantity);

      if (product.stockPro > allProducts[0].quantity) {
        return (
          <a onClick={() => onAddProduct(product)} className="btn-cartd-product">
            <div className="icon-addproduct">
              <img src="img/icons/shop.png" alt="Shop Icon" />
            </div>
          </a>
        );
      } else {

        return (
          <p>No Stock</p>
        );
      }
    }

    return null;
  }

  return (
    <div className="margin-90 conter-pro">
      <div className="conter-search top-50">
        <CFormInput
          placeholder="¿Qué estás buscando?"
          className="input-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <Sliders data={data} />
        <div className="box-vendido top-50">
          {
            filteredData?.map((product) => (
              <>
                <Card sx={{ width: 320 }} key={product.id}>
                  <div>
                    <Typography level="title-lg">{product.nombrePro}</Typography>
                    <Typography level="body-sm">{product.descripPro}</Typography>
                    <IconButton
                      aria-label="bookmark Bahamas Islands"
                      variant="plain"
                      color="neutral"
                      size="sm"
                      sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                    >
                      <BookmarkAdd />
                    </IconButton>
                  </div>
                  <AspectRatio minHeight="120px" maxHeight="200px">
                    <img
                      src={product.img}
                      srcSet={product.img}
                      loading="lazy"
                      alt={product.nombrePro}
                    />
                  </AspectRatio>
                  <CardContent orientation="horizontal">
                    <div>
                      <Typography level="body-xs">Total price:</Typography>
                      <Typography fontSize="lg" fontWeight="lg">
                        ${product.precioPro}
                      </Typography>
                    </div>
                    <div className="flex">
                      <Tooltip title="Agregar al carrito">
                        <Button variant="contained" color='warning'>
                          <AddShoppingCartIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Ver detalle">
                        <Button variant="contained">
                          <LoupeIcon />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </>

            ))
          }
        </div>
      </div>
    </div>
  );
}
