import {
  CInputGroup,
  CFormInput,
  CButton,
  CCardTitle,
  CCard,
  CCardImage,
  CCardBody,
  CSpinner,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import isMountedRef from '../../../../hooks/useRefMounted';

export default function ProList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/categoryProd`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

        setData(response.data);
        setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getDataList();
  }, [getDataList]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger"/>
      </div>
    )
  }


  const filteredData = data?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="margin-90 conter-pro">
      <div className="conter-search top-50">
        <CFormInput
          placeholder="¿Qué estás buscando?"
          className="input-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <div className="box-vendido">
          {filteredData?.map((product) => {
            return (
              <CCard>
                <div className="flex">
                  <CCardTitle className="top-50 ">
                    {product.name.toUpperCase()}
                  </CCardTitle>
                </div>
                <CCardImage
                  orientation="top"
                  src={product.img}
                  className="img-cards"
                />
                <CCardBody>
                  <div className="flex">
                    <a type="button" className="btn1 btn-secondary">
                      Ver mas
                    </a>
                  </div>
                </CCardBody>
              </CCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
