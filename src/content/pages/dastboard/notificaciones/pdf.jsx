import {
    CForm,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CSpinner,
} from "@coreui/react";
import { Button } from "@mui/joy";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Tooltip } from "@mui/joy";
import Factura from "../../facturaPay";
import isMountedRef from "../../../../hooks/useRefMounted";

export default function PDF({ id }) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
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
                <Button onClick={() => setVisible(!visible)} >
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
                        Toma captura de la factura, para reclamar su producto en nuestra
                        tienda.
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3">
                        <Factura data={data} />
                    </CForm>
                </CModalBody>
                <CModalFooter>

                </CModalFooter>
            </CModal>
        </>
    );
}
