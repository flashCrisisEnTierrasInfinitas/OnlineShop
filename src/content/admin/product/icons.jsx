import { CSpinner } from "@coreui/react";
import { Button, IconButton } from "@mui/material";
import PlumbingIcon from '@mui/icons-material/Plumbing';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Icons({ data }) {
    const [loading, setLoading] = useState(false);
    const ID = data.id;
    const Delete = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`/product/${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            return Swal.fire({
                position: "center",
                icon: "success",
                title: response.data,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (e) {
            setLoading(false);
            return Swal.fire({
                position: "center",
                icon: "error",
                title: e,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="conter-icons">

            <IconButton aria-label="fingerprint" color="primary" onClick={() => Delete(ID)}>
               <PlumbingIcon />
            </IconButton>
            <IconButton onClick={() => Delete(ID)} color="error" aria-label="fingerprint">
                {loading ? (
                    <div className="progess">
                        <CSpinner color="danger" size="sm" style={{ width: '1rem', height: '1rem' }} />
                    </div>
                ) : ( <DeleteForeverIcon />)}

            </IconButton>
        </div>
    );
}
