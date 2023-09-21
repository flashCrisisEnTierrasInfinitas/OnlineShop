import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import ListCategorias from "./ListCategorias";



export default function Table() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get('/product', {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
      );
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getProduct();
  }, []);
  getProduct();
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger"/>
      </div>
    )
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
              <CTableHeaderCell>img</CTableHeaderCell>
              <CTableHeaderCell>descripcion</CTableHeaderCell>
              <CTableHeaderCell>codigo</CTableHeaderCell>
              <CTableHeaderCell>tipoProducto</CTableHeaderCell>
              <CTableHeaderCell>fecha</CTableHeaderCell>
              <CTableHeaderCell>precio</CTableHeaderCell>
              <CTableHeaderCell>stock</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableHead>
            <CTableBody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <CTableDataCell>{item.id}</CTableDataCell>
                  <CTableDataCell>{item.nombrePro}</CTableDataCell>
                  <CTableDataCell><img src={item.img} alt={item.nombrePro} className="img-table" /></CTableDataCell>
                  <CTableDataCell>{item.descripPro}</CTableDataCell>
                  <CTableDataCell>{item.codigoPro}</CTableDataCell>
                  <CTableDataCell><ListCategorias id={item.id_category}/></CTableDataCell>
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
