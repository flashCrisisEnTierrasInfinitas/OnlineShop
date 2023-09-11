import React, { useState } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CContainer,
  CCard,
  CCardBody,
  CAlert,
  CButton,
  CFormInput,
} from "@coreui/react";


const data = [
  {
    id: 1,
    img: "https://c.pxhere.com/photos/84/fb/background_bitter_breakfast_bright_c_catering_closeup_close_up-819293.jpg!d",
    title: "kiwi",
    date: "06/05/2023",
    quantity: 1,
  },
  {
    id: 2,
    img: "https://get.pxhere.com/photo/plant-white-fruit-sweet-restaurant-isolated-summer-food-salad-green-cooking-ingredient-produce-tropical-colourful-macro-natural-fresh-couple-two-colorful-closeup-breakfast-healthy-delicious-health-cookery-fitness-life-close-up-peel-background-nutrition-mango-bright-seasonal-tasty-passion-still-over-good-c-catering-diet-vitamins-bitter-refreshing-rind-dieting-flowering-plant-nutrients-several-land-plant-wholesome-819451.jpg",
    title: "MANGO",
    date: "06/05/2023",
    quantity: 1,
  },
  {
    id: 3,
    img: "https://c.pxhere.com/photos/c4/2c/background_bitter_breakfast_bright_c_catering_closeup_close_up-819464.jpg!d",
    title: "naranjas",
    date: "06/05/2023",
    quantity: 1,
  },
  {
    id: 4,
    img: "https://c.pxhere.com/photos/eb/ac/background_bitter_breakfast_bright_c_catering_closeup_close_up-819423.jpg!d",
    title: "limon",
    date: "06/05/2023",
    quantity: 1,
  },
  {
    id: 6,
    img: "https://c.pxhere.com/photos/51/2b/pea_peas_vegetables_green_food_healthy_vegetarian_vegetable-1050058.jpg!d",
    title: "arveja",
    date: "06/05/2023",
    quantity: 1,
  },
  {
    id: 7,
    img: "https://c.pxhere.com/images/ed/6d/6f8f2820848433558a0982c074b5-1636140.jpg!d",
    title: "tomate",
    date: "06/05/2023",
    quantity: 1,
  },
  {
    id: 9,
    img: "https://c.pxhere.com/photos/f8/89/appetite_banana_calories_catering_cellulite_chilli_cholesterol_close_up-1048666.jpg!d",
    title: "pimenton",
    date: "06/05/2023",
    quantity: 1,
  },
  {
    id: 10,
    img: "https://c.pxhere.com/photos/83/dd/tangerines_citrus_fruit_clementines_citrus_fruit_vitamins_juicy_orange-458951.jpg!d",
    title: "mandarina",
    date: "06/05/2023",
    quantity: 1,
  },
];

export default function Table() {
  const itemsPerPage = 5; // Cambia esto según tus necesidades
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="conter-table">
       <div className="conter-search top-50">
        <CFormInput
          placeholder="¿Qué estás buscando?"
          className="input-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        <CCard>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Fecha</CTableHeaderCell>
                <CTableHeaderCell>img</CTableHeaderCell>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
              </CTableHead>
              <CTableBody>
                {filteredData
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item) => (
                    <tr key={item.id}>
                      <CTableDataCell>{item.id}</CTableDataCell>
                      <CTableDataCell>{item.date}</CTableDataCell>
                      <CTableDataCell>
                        <div className="img-table">
                          <img src={item.img} />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.title.toUpperCase()}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="boton-tabla">
                          <CButton color="danger" variant="outline">
                            <i className="fa fa-trash" aria-hidden="true" />
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </tr>
                  ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
    </div>
  );
}
