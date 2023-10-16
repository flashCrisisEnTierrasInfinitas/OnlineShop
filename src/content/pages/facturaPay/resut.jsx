import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { CSpinner } from "@coreui/react";
import isMountedRef from "../../../hooks/useRefMounted";

export default function Result({ id }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getDataList = useCallback(async () => {
        try {
            const response = await axios.get(`/ventasProductos/${id}`, {
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
    getDataList();
    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <CSpinner color="danger" />
            </div>
        );
    }

    return (
        <>
            {data.map((data) => (
                <>
                    <div className="produc-factura">
                        <div>
                            <p>{data.nombrePro}</p>
                        </div>
                        <div className="precio-pro-fac">
                            <p>{data.precio}</p>
                        </div>
                    </div>
                </>
            ))}
        </>
    );
}
