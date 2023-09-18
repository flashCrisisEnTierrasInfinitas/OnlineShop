import {
  CInputGroup,
  CFormInput,
  CButton,
  CCardTitle,
  CCard,
  CCardImage,
  CCardBody,
} from "@coreui/react";
import React, { useState, useEffect, useCallback } from "react";

const data = [
  {
    id: 1,
    img: "https://c.pxhere.com/photos/84/fb/background_bitter_breakfast_bright_c_catering_closeup_close_up-819293.jpg!d",
    title: "Kiwi importado x 500gr",
    price: 10.495,
    quantity: 1,
  },
  {
    id: 2,
    img: "https://groupesebcol.vtexassets.com/arquivos/ids/160210-800-auto?v=637866627842230000&width=800&height=auto&aspect=true",
    title: "Licuadora TEFAL Perfect Mix + Tritan Powelix - Imusa",
    price: 129.900,
    quantity: 1,
  },
  {
    id: 9,
    img: "https://www.todoaseo.com/wp-content/uploads/2017/01/JABON-POLVO-AS-AZUL-X-3000-GR-REF-06472.jpg",
    title: "JABON POLVO AS AZUL X 3000 GR CJX6",
    price: 38.390,
    quantity: 1,
  },
  {
    id: 3,
    img: "https://c.pxhere.com/photos/c4/2c/background_bitter_breakfast_bright_c_catering_closeup_close_up-819464.jpg!d",
    title: "Naranja Valencia x 6000 gr",
    price: 3.880,
    quantity: 1,
  },
  {
    id: 4,
    img: "https://c.pxhere.com/photos/eb/ac/background_bitter_breakfast_bright_c_catering_closeup_close_up-819423.jpg!d",
    title: "Malla Limón x 1000 gr",
    price: 6.190,
    quantity: 1,
  },
  {
    id: 6,
    img: "https://c.pxhere.com/photos/51/2b/pea_peas_vegetables_green_food_healthy_vegetarian_vegetable-1050058.jpg!d",
    title: "Arveja x 500gr",
    price: 20.590,
    quantity: 1,
  },
  {
    id: 7,
    img: "https://c.pxhere.com/images/ed/6d/6f8f2820848433558a0982c074b5-1636140.jpg!d",
    title: "Tomate chonto x 500gr ",
    price: 5.940,
    quantity: 1,
  },
  {
    id: 9,
    img: "https://exitocol.vtexassets.com/arquivos/ids/5793759/Vino-Estoril-Dulce-Botella-X-750ml-24490_a.jpg?v=637482049979600000",
    title: "VINO DULCE BOTELLA ESTORIL 750 ml",
    price: 15.393,
    quantity: 1,
  },
  {
    id: 10,
    img: "https://c.pxhere.com/photos/83/dd/tangerines_citrus_fruit_clementines_citrus_fruit_vitamins_juicy_orange-458951.jpg!d",
    title: "Mandarina clementina importada x 500 gr ",
    tetx: '',
    price: 6.795,
    quantity: 1,
  },
];

export default function ProList({
  allProducts,
  setAllproducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllproducts([...products]);
    }

    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllproducts([...allProducts, product]);
  };

  const Sale = (product) => {
    onAddProduct(product);
    return window.location.replace("/pay");
  };

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
          {filteredData?.map((product) => {
            return (
              <CCard>
                <CCardImage
                  orientation="top"
                  src={product.img}
                  className="img-cards"
                />
                <CCardBody>
                  <CCardTitle>{product.title.toUpperCase()}</CCardTitle>
                  <div className="descripcio">
                    <label>
                      {product.tetx}
                    </label>
                  </div>
                  <div className="precio">
                    <p className="color-primary">$999.00</p>
                    <a className="color-secondary">$ {product.price}</a>
                  </div>
                  <div className="btn-card">
                    <a onClick={() => onAddProduct(product)} className="btn-cartd-product">
                      <div className="icon-addproduct">
                        <img src="img/icons/shop.png" />
                      </div>
                    </a>
                    <button onClick={() => Sale(product)}>Comprar</button>
                  </div>
                </CCardBody>
              </CCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
