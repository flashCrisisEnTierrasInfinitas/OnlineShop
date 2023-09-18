import React, { useState } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CCard,
  CCardBody,
  CButton,
  CFormInput,
} from "@coreui/react";

const data = [
  {
    id: 1,
    img: "https://media.gq.com.mx/photos/609c0fdeee4372271f0b9056/1:1/w_2000,h_2000,c_limit/salir%20guapo%20en%20fotos-605380757.jpg",
    title: "Jhon Mario chilito",
    date: "06/05/2023",
    quantity: 1,
  },
  {
    id: 2,
    img: "https://us.123rf.com/450wm/samwordley/samwordley1908/samwordley190800008/150700683-emocionado-joven-de-moda-tomando-selfie-o-blogueando-en-un-tel%C3%A9fono-m%C3%B3vil-inteligente-en-vacaciones.jpg?ver=6",
    title: "carlos mateo",
    date: "06/05/2023",
    quantity: 1,
  },
  {
    id: 3,
    img: "https://us.123rf.com/450wm/vadymvdrobot/vadymvdrobot1807/vadymvdrobot180704289/105043557-foto-de-hombre-joven-alegre-alegre-barbudo-tomar-un-selfie-por-tel%C3%A9fono-m%C3%B3vil.jpg?ver=6",
    title: "jose",
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
    <div className="box-admin">
      <div className="conter-search">
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
                    <CTableDataCell>{item.title.toUpperCase()}</CTableDataCell>
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
