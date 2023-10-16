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
import {
  cilBellExclamation, cilFire, cilInfo, cilCheck
} from "@coreui/icons";
import axios from "axios";
import isMountedRef from "../../../../hooks/useRefMounted";
import Cookies from "js-cookie";
import { Alert, AlertTitle, Chip } from "@mui/material";
import PDF from "./pdf";

export default function Table({ Seccion, setContNotifi }) {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const uniqueCount = new Set(data).size;
  setContNotifi(uniqueCount);
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
    const { status_venta, id } = data;
    if (status_venta == 0) {
      return (

        < Alert severity="warning" >
          <AlertTitle>Sin Entregar</AlertTitle>
          <div className="flex">
            <Chip label={id} color="primary" />—<PDF id={id} />
          </div>
        </Alert >
      );
    }
    if (status_venta == 1) {
      return (
        <Alert severity="error">
          <AlertTitle>Su compra fue rechazada</AlertTitle>
          <div className="flex">
            <Chip label={id} color="primary" />—<PDF id={id} />
          </div>
        </Alert>
      );
    }
    if (status_venta == 2) {
      return (
        <Alert severity="info">
          <AlertTitle> Su producto ya fue enviado, en breve resivira su producto en su puerta!</AlertTitle>
          <div className="flex">
            <Chip label={id} color="primary" />—<PDF id={id} />
          </div>
        </Alert>
      );
    }
    if (status_venta == 3) {
      return (
        <Alert severity="success">
          <AlertTitle>Su compra ya fue entregada!</AlertTitle>
          <div className="flex">
            <Chip label={id} color="primary" />—<PDF id={id} />
          </div>
        </Alert>
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
                .map((item) => (
                  <tr key={item.id}>
                    <CTableDataCell>{Status(item)}</CTableDataCell>
                  </tr>
                ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
}
