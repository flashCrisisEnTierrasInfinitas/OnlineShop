import axios from "axios";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CSpinner } from "@coreui/react";
import { useState } from "react";

export default function Icons({ data, key, setKey }) {
  const ID = data.id;
  const [loading, setLoading] = useState(false);

  const Delete = async (id) => {
    try {
      const response = await axios.delete(`/categoryProd/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setKey(key + 1);
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
      <IconButton aria-label="fingerprint" color="primary">
        <PlumbingIcon />
      </IconButton>
      <IconButton
        onClick={() => Delete(ID)}
        color="error"
        aria-label="fingerprint"
      >
        {loading ? (
          <div className="progess">
            <CSpinner
              color="danger"
              size="sm"
              style={{ width: "1rem", height: "1rem" }}
            />
          </div>
        ) : (
          <DeleteForeverIcon />
        )}
      </IconButton>
    </div>
  );
}
