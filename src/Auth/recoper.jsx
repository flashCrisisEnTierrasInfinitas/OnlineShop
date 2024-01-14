import { CFormInput } from "@coreui/react";
import { Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

const styles = {
  btn: {
    color: "#2854D8",
    border: "1px solid #2854D8",
  },
};

export default function Recouper() {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataLog, setDataLog] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLog((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };
  const getDataList = async () => {
    try {
      const response = await axios.get(
        `/tWxaSh5KffstEpFpwkt67eGH+PRzI9/k44a/8jN6VLSqNM2nrE0MHoBjxffaC+qE/${dataLog.email}`
      );

      setData(response.data);
    } catch (err) {
      console.warn(err)
      return alert(err.response.data.message);
    }
  };

  const SaveNewPassword = async () => {
    try {
      const response = await axios.post(
        `21HuCgOHJL0fETeSxzlNrJtx4hmQUVo9Pz8tfiT3AYXRe+0mcQrh5nu1fKJjQo7X/${data.data}`,
        dataLog
      );
      return alert(response.data.message);
    } catch (error) {
      return alert(error);
    }
  };

  const Validate = () => {
    if (data.status == 200) {
      setLoading(true);
      return (
        <div className="top-20">
          <Alert severity="success">Correo Validado por google OAuth 2.0.</Alert>
        </div>
      );
    }
  };

  return (
    <div className="conted-login">
      <div className="conter-box-login">
        <div className="box-">
          <form className="form-login">
            <h1 className="top-50">Validate Correo</h1>
            <CFormInput
              placeholder="email"
              className="inpunt-login"
              name="email"
              type="email"
              value={dataLog.email}
              onChange={handleChange}
            />
            <Validate data={data} />
            {loading ? (
              <div className="flex">
                <CFormInput
                  placeholder="New password"
                  className="inpunt-login"
                  name="password"
                  type={mostrarPassword ? "text" : "password"}
                  value={dataLog.password}
                  onChange={handleChange}
                />
                <button
                  onClick={toggleMostrarPassword}
                  type="button"
                  className="btn1"
                  style={styles.btn}
                >
                  {mostrarPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="flex">
              {loading ? (
                <button
                  type="button"
                  className="btn1 btn-secondary"
                  onClick={SaveNewPassword}
                >
                  Guardar
                </button>
              ) : (
                <button
                  type="button"
                  className="btn1 btn-secondary"
                  onClick={getDataList}
                >
                  Validar
                </button>
              )}
            </div>
            <div className="next-login">
              <a href="/login"><span>Regresar al Login.</span></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
