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
import axios from "axios";
import isMountedRef from "../../../../hooks/useRefMounted";
import Cookies from "js-cookie";

export default function Table({Seccion}) {
  const itemsPerPage = 5; // Cambia esto según tus necesidades
  const [currentPage, setCurrentPage] = useState(1);
  const token = Cookies.get("token");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/ventas/${Seccion}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + token,
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
