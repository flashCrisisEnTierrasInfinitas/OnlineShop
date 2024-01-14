import {
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import { Tooltip } from "@mui/joy";
import Factura from "../../facturaPay";
import isMountedRef from "../../../../hooks/useRefMounted";
import { Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function PDF({ id }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const targetRef = useRef();
  var getToken = Cookies.get("token");

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/listOneVenta/${id}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + getToken,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
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

  return (
    <>
      <Tooltip title="Factura de compra">
        <Button onClick={() => setVisible(!visible)} variant="contained">
          <PictureAsPdfIcon />
        </Button>
      </Tooltip>
      <CModal
        size="xl"
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">
            Toma captura de la factura o descargala dando clic en el botón azul,
            para reclamar su producto en nuestra tienda.
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <div className="flex">
              <Button
                variant="contained"
                onClick={() =>
                  generatePDF(targetRef, {
                    filename:
                      data.id +
                      " " +
                      data.user_compra +
                      " " +
                      new Date(data.created_at).toLocaleString() +
                      ".pdf",
                  })
                }
              >
                <CloudDownloadIcon />
              </Button>
            </div>
            <div ref={targetRef}>
              <Factura data={data} />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </>
  );
}
