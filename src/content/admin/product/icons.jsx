import { CButton } from "@coreui/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Icons({data}) {
const ID = data.id;
    const Delete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/product/${id}`, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
              });
            return Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="conter-icons">
            <CButton onClick={() => Delete(ID)}>delete</CButton>
            <CButton onClick={() => Delete(ID)}>update</CButton>
        </div>
    )
}