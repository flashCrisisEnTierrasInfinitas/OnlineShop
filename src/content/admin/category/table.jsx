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



export default function Table({key,setKey}) {

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getProduct();
  }, [getProduct,key]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    )
  }

  const filteredData = data?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const State = ({data}) => {
    const map = {
      0: {
        Text: 'Activo',
        color:'green'
      },
      1: {
        Text: 'Inactivo',
        color:'red'
      }
    }
    const { Text,color } = map[data];

    return <a style={{color:color}}>{Text}</a>
  }
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
              <CTableHeaderCell>estado</CTableHeaderCell>
              <CTableHeaderCell>fecha</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableHead>
            <CTableBody>
              {filteredData
                .map((item) => (
                  <tr key={item.id}>
                    <CTableDataCell>{item.id}</CTableDataCell>
                    <CTableDataCell><p style={{ color: item.color }}>{item.name}</p></CTableDataCell>
                    <CTableDataCell><img src={item.img} alt={item.name} className="img-table" /></CTableDataCell>
                    <CTableDataCell><State data={item.state} /></CTableDataCell>
                    <CTableDataCell>{item.created_at}</CTableDataCell>
                    <CTableDataCell>
                      <Icons data={item} setKey={setKey}  key={key}/>
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
