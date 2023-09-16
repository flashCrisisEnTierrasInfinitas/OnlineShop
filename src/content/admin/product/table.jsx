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
  CSpinner,
} from "@coreui/react";
import axios from "axios";
import Icons from "./icons";
import isMountedRef from '../../../hooks/useRefMounted'



export default function Table() {
  const itemsPerPage = 5; // Cambia esto según tus necesidades
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);


  const [data, setData] = useState([]);


  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product', {
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
    const map = {
      0: {
        text: 'Verduras',
        color: 'rgb(241, 96, 29)'
      },
      1: {
        text: 'Electrodomestico',
        color: 'rgb(0, 255, 0)'
      },
      3: {
        text: 'cocina',
        color: 'blue'
      }
    };
    const { text, color } = map[data];

    return <a style={{ color: color }}>{text}</a>;
  }

  // Llama a la función dentro de useEffect, para que se ejecute una vez al montar el componente

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
              <CTableHeaderCell>tipoProducto</CTableHeaderCell>
              <CTableHeaderCell>fecha</CTableHeaderCell>
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
                    <CTableDataCell><TipoPro data={item.tipoPro} /></CTableDataCell>
                    <CTableDataCell>{item.created_at}</CTableDataCell>
                    <CTableDataCell>${item.precioPro}</CTableDataCell>
                    <CTableDataCell>{item.stockPro}</CTableDataCell>
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
