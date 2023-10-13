import React, { useState } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CCard,
  CCardBody,
  CSpinner,
} from "@coreui/react";
import Icons from "./icons";
import { useEffect } from "react";
import { useCallback } from "react";
import isMountedRef from "../../../hooks/useRefMounted";
import axios from "axios";
import { Alert } from "@mui/material";
import DataGrids from "./DataGrid";

export default function Table({ token }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState([]);

  const [data, setData] = useState([]);

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get("/users", {
        headers: {
          "Content-Type": "multipart/form-data",
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + token,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setMessage(error.response.data.message)
      setError(true);
      setLoading(false);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  getProduct();

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }

  const filteredData = data?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {
        Error ? (<Alert variant="filled" severity="error">
          {Message}
        </Alert>) : (
          <div className="box-admin">
            <div className="conter-search">
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                class="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)
                }
              />
            </div >
            <DataGrids data={filteredData} />
          </div >
        )
      }
    </>

  );
}
