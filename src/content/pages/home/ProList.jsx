import {
  CFormInput,
  CCardTitle,
  CCard,
  CCardImage,
  CCardBody,
  CSpinner,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import isMountedRef from '../../../hooks/useRefMounted';

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
  
    // Agrega un return fuera de la condición para otros casos
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
        <div className="box-vendido">
          {
            filteredData?.map((product) => (
              <CCard key={product.id}> {/* Agrega una clave única para cada tarjeta */}
                <CCardImage
                  orientation="top"
                  src={product.img}
                  className="img-cards"
                />
                <CCardBody>
                  <CCardTitle>{product.nombrePro.toUpperCase()}</CCardTitle>
                  <div className="descripcio">
                    <label>{product.descripPro}</label> {/* Corrige el nombre de la propiedad */}
                  </div>
                  <div className="precio">
                    <p className="color-primary">$999.00</p>
                    <a className="color-secondary">$ {product.precioPro}</a>
                  </div>
                  <div className="btn-card">
                    <Validate product={product} />
                    <button onClick={() => Sale(product)}>Comprar</button>
                  </div>
                </CCardBody>
              </CCard>
            ))
          }
        </div>
      </div>
    </div>
  );
}
