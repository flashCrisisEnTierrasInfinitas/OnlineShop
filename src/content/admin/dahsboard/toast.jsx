import { CToast, CToastBody, CToastHeader } from "@coreui/react";
import { Chip } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";

export default function Toast() {
    const [data, setData] = useState([]);
    var getToken = Cookies.get('token');

    const handleListVentas = async () => {
        try {
            const response = await axios.get(`/listAllventasStatus/0`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + getToken,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        handleListVentas();
    }, []);

    return (
        <div className="conter-toast">
            {data.map(data => (
                <CToast animation={false} autohide={false} visible={false}>
                    <CToastHeader closeButton>
                        <svg
                            className="rounded me-2"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                            role="img"
                        >
                            <rect width="100%" height="100%" fill="#ff3d00"></rect>
                        </svg>
                        <div className="fw-bold me-auto">
                            Pedido Nuevo
                        </div>
                        <small>{data.created_at.toLocaleString()}</small> 
                    </CToastHeader>
                    <CToastBody>
                        Numero de referencia:<Chip label={data.id} color="primary"/>
                    </CToastBody>
                </CToast>
            ))}
        </div>
    )
}