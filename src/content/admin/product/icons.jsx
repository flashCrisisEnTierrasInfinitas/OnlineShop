import { CButton } from "@coreui/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Icons({ data }) {
    const ID = data.id;
    const Delete = async (id) => {
        try {
            const response = await axios.delete(`/product/${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return Swal.fire({
                position: "center",
                icon: "success",
                title: response.data,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (e) {
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
            <CButton color="danger" variant="outline" onClick={() => Delete(ID)}>
                <i className="fa fa-trash" aria-hidden="true" />
            </CButton>
            <CButton color="primary" variant="outline" onClick={() => Delete(ID)}>
            <i className="fa fa-wrench" aria-hidden="true"/>
            </CButton>
        </div>
    );
}
