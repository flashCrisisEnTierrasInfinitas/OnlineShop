import React, { useState } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CAlert,

} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBurn, cilCheckCircle, cilDelete, cilInfo } from "@coreui/icons";
import DeleteIcon from '@mui/icons-material/Delete';

const data = [
  {
    id: 1,
    status: 1,
    name: "06/05/2023",
    age: "Su compra fue aprobada, en un tiempo estimado de una hora llegara a su puerta",
  },
  {
    id: 2,
    status: 0,
    name: "07/05/2023",
    age: "Su compra fue rechazada por motivos de datos incorrectos",
  },
  {
    id: 3,
    status: 2,
    name: "07/05/2023",
    age: "Verifique sus datos para poder hacer compras en nuestra tienda virtual",
  },
  // Agrega más datos aquí
];

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  // Agrega más columnas aquí
];

export default function Table() {
  const itemsPerPage = 5; // Cambia esto según tus necesidades
  const [currentPage, setCurrentPage] = useState(1);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const Status = (data) => {
    const { status, age } = data;
    if (status == 0) {
      return (
        <CAlert color="danger">
          <CIcon
            icon={cilBurn}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          {age}
        </CAlert>
      );
    }
    if (status == 1) {
      return (
        <CAlert color="success">
          <CIcon
            icon={cilCheckCircle}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          {age}
        </CAlert>
      );
    }
    if (status == 2) {
      return (
        <CAlert color="info">
          <CIcon
            icon={cilInfo}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          {age}
        </CAlert>
      );
    }
  };
  return (
    <div className="conter-table top-50">
      <CCard>
        <CCardBody>
          <CTable striped>
            <CTableBody>
              {data
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <tr key={item.id}>
                    <CTableDataCell>{Status(item)}</CTableDataCell>
                    <CTableDataCell>
                      <div className="boton-tabla">
                        <button className="btn">
                          <DeleteIcon />
                        </button>
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
