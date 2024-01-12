import { CFormInput } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Password() {
  const [data, setData] = useState([]);
  const [dataLog, setDataLog] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLog((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getDataList = async () => {
    try {
      const response = await axios.get(
        `/tWxaSh5KffstEpFpwkt67eGH+PRzI9/k44a/8jN6VLSqNM2nrE0MHoBjxffaC+qE/${dataLog.email}`
      );

      setData(response.data);
    } catch (err) {
      return console.warn(err);
    }
  };

  return (
    <div className="conted-login">
      <div className="conter-box-login">
        <div className="box-">
          <form className="form-login">
            <h1 className="top-50">New Password</h1>
            <CFormInput
              placeholder="email"
              className="inpunt-login"
              name="email"
              type="email"
              value={dataLog.email}
              onChange={handleChange}
            />
            <Validate data={data} />
            <div className="flex">
              <button
                type="button"
                className="btn1 btn-secondary"
                onClick={getDataList}
              >
                Validar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
