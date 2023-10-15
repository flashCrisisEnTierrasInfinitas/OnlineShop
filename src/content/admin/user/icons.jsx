import { CButton, CSpinner } from "@coreui/react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Update from "./update";
import { useState } from "react";

export default function Icons({ data }) {
    const ID = data.id;
    const [loading, setLoading] = useState(false);
    var token = Cookies.get('token');
    const datas = {
        status: 1
    }
    const Delete = async (id) => {
        try {
            setLoading(true);
            const response = await axios.post(`/usersDelete/${id}`, datas, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    " X-Requested-With": "XMLHttpRequest",
                    'Authorization': 'Bearer ' + token,
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
            <CButton
                color="danger"
                variant="outline" onClick={() => Delete(ID)}
            >
                {loading ? (
                    <div className="progess">
                        <CSpinner color="light" size="sm" style={{ width: '1rem', height: '1rem' }} />
                    </div>
                ) : (<i className="fa fa-trash" aria-hidden="true" />)}
            </CButton>
            <Update data={data} />
        </div>
    );
}
