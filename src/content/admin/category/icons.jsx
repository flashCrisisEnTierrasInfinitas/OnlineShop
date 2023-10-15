import axios from "axios";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CButton, CSpinner } from "@coreui/react";
import { useState } from "react";
import Update from "./update";

export default function Icons({ data, key, setKey, token }) {
  const ID = data.id;
  const [loading, setLoading] = useState(false);
  const datas={
    state:1
  }

  const Delete = async (id) => {
    try {
      setLoading(true)
      const response = await axios.post(`/categoryState/${id}`,datas, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ' X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + token,
        },
      });
      setKey(key + 1);
      setLoading(false)
      return Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      setLoading(false)
      console.log(e)
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
      <Update setKey={setKey} key={key} data={data}/>
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
    </div>
  );
}
