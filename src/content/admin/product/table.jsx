import React, { useEffect, useState } from "react";
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
import axios from "axios";



export default function Table() {
  const itemsPerPage = 5; // Cambia esto según tus necesidades
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");


  const [data, setData] = useState([]);
  console.log("🚀 ~ file: table.jsx:24 ~ Table ~ data:", data)


  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product', {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUsuarios(); // Llama a la función dentro de useEffect, para que se ejecute una vez al montar el componente

  }, []);

  const filteredData = data?.filter((item) =>
    item.nombrePro?.toLowerCase().includes(searchTerm.toLowerCase())
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
              <CTableHeaderCell>nombre</CTableHeaderCell>
              <CTableHeaderCell>descripcion</CTableHeaderCell>
              <CTableHeaderCell>codigo</CTableHeaderCell>
              <CTableHeaderCell>precio</CTableHeaderCell>
              <CTableHeaderCell>stock</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
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
                    <CTableDataCell>{item.nombrePro}</CTableDataCell>
                    <CTableDataCell>{item.descripPro}</CTableDataCell>
                    <CTableDataCell>{item.codigoPro}</CTableDataCell>
                    <CTableDataCell>{item.created_at}</CTableDataCell>
                    <CTableDataCell>{item.precioPro}</CTableDataCell>
                    <CTableDataCell>{item.stockPro}</CTableDataCell>
                    <CTableDataCell>
                      <div className="boton-tabla">
                        <button type="button" className="btn1 btn-primary">Delete</button>
                        <button type="button" className="btn1 btn-secondary">Update</button>
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
