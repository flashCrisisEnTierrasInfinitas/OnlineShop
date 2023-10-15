import { CButton, CSpinner } from "@coreui/react";
import { Button, IconButton } from "@mui/material";
import PlumbingIcon from '@mui/icons-material/Plumbing';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import Update from "./update";
import Cookies from "js-cookie";

export default function Icons({ data }) {
    const fordata = {
        status: 1
    }
    var getToken = Cookies.get("token");
    const [loading, setLoading] = useState(false);

    const Delete = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`/productStatus/${data.row.id}`, fordata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'X-Requested-With': 'XMLHttpRequest',
                    Authorization: "Bearer " + getToken,
                },
            });
            setLoading(false);
            return Swal.fire({
                position: "center",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (e) {
            setLoading(false);
            return Swal.fire({
                position: "center",
                icon: "error",
                title: e.response.data.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="conter-icons">
            <CButton onClick={Delete} variant="outline" color="danger">
                {loading ? (
                    <div className="progess">
                        <CSpinner color="danger" size="sm" style={{ width: '1rem', height: '1rem' }} />
                    </div>
                ) : (<DeleteForeverIcon />)}
            </CButton>
            <Update data={data} />
        </div>
    );
}
