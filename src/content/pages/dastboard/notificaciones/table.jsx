import React, { useCallback, useEffect, useState } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CAlert,
  CSpinner,

} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBellExclamation,cilFire,cilInfo,cilCheck
} from "@coreui/icons";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import isMountedRef from "../../../../hooks/useRefMounted";

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



export default function Table() {
  const itemsPerPage = 5; // Cambia esto según tus necesidades
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/ventas/karen`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
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
    );
  }

  const Status = (data) => {
    const { status_venta, age } = data;
    if (status_venta == 0) {
      return (
        <CAlert color="warning">
          <CIcon
            icon={cilBellExclamation}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          Compra Sin Entregar
        </CAlert>
      );
    }
    if (status_venta == 1) {
      return (
        <CAlert color="error">
          <CIcon
            icon={cilFire}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          Su compra fue rechazada
        </CAlert>
      );
    }
    if (status_venta == 2) {
      return (
        <CAlert color="info">
          <CIcon
            icon={cilInfo}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          Su producto ya fue enviado, en breve resivira su producto en su puerta!
        </CAlert>
      );
    }
    if (status_venta == 3) {
      return (
        <CAlert color="info">
          <CIcon
            icon={cilCheck}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          Su compra ya fue entregada!
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
                  {/*   <CTableDataCell>
                      <div className="boton-tabla">
                        <button className="btn">
                          <DeleteIcon />
                        </button>
                      </div>
                    </CTableDataCell> */}
                  </tr>
                ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
}
