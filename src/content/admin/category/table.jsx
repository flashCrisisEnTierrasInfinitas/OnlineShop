import React, { useCallback, useEffect, useState } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CCard,
  CCardBody,
  CFormInput,
} from "@coreui/react";
import axios from "axios";
import Icons from "./icons";
import isMountedRef from '../../../hooks/useRefMounted'



export default function Table() {
  const itemsPerPage = 5; // Cambia esto según tus necesidades
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");


  const [data, setData] = useState([]);


  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get('/categoryProd', {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
      );
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  getProduct();


  const TipoPro = ({data}) => {
  
  }

  // Llama a la función dentro de useEffect, para que se ejecute una vez al montar el componente

  const filteredData = data?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
              <CTableHeaderCell>estado</CTableHeaderCell>
              <CTableHeaderCell>fecha</CTableHeaderCell>
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
                    <CTableDataCell><p style={{color:item.color}}>{item.name}</p></CTableDataCell>
                    <CTableDataCell>{item.state}</CTableDataCell>
                    <CTableDataCell>{item.created_at}</CTableDataCell>
                    <CTableDataCell>
                      <Icons data={item} />
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
