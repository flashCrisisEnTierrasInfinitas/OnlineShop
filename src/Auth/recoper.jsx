import { CFormInput } from "@coreui/react";
import { useState } from "react";

export default function Recouper() {

    const [dataLog, setDataLog] = useState({
        email: "",
      });

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
            />
            <div className="flex">
              <button type="button" className="btn1 btn-secondary">
                Validar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
