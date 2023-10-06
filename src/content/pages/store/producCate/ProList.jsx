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
import isMountedRef from "../../../../hooks/useRefMounted";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import LoupeIcon from "@mui/icons-material/Loupe";
import { Tooltip, Button } from "@mui/material";

export default function ProList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/categoryProd`, {
        headers: {
          "Content-Type": "multipart/form-data",
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
        <CSpinner color="danger" />
      </div>
    );
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
              <div className="card-pro-list">
                <Card key={product.id}>
                  <div>
                    <h1 className="title-card-list">{product.name}</h1>
                    <IconButton
                      aria-label="bookmark Bahamas Islands"
                      variant="plain"
                      color="neutral"
                      size="sm"
                      sx={{
                        position: "absolute",
                        top: "0.875rem",
                        right: "0.5rem",
                      }}
                    >
                      <BookmarkAdd />
                    </IconButton>
                  </div>
                  <AspectRatio minHeight="120px" maxHeight="400px">
                    <img
                      src={product.img}
                      srcSet={product.img}
                      loading="lazy"
                      alt={product.name}
                    />
                  </AspectRatio>
                  <CardContent orientation="horizontal">
                    <div className="flex boton-product">
                      <Tooltip title="Ver Más">
                        <a href={`categoryProduct/${product.id}`}>
                          <Button variant="contained" color="warning">
                            <LoupeIcon />
                          </Button>
                        </a>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
