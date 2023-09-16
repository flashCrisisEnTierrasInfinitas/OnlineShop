import { useState } from "react";
import CIcon from "@coreui/icons-react";
import { cilX } from "@coreui/icons";

export default function AppBarAdmin() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="conter-appBar">
      <div className="close-appbar">
        <CIcon icon={cilX} />
      </div>
      <div className="logo-admin"><a href="/">ASUPRO</a></div>
      <div className="box-appbar">
        <a href="/dahsboard" className="text-appBar">
          <i class="fa fa-tachometer" aria-hidden="true"></i>
          <label>dahsboard</label>
        </a>
        <a href="/User" className="text-appBar">
          <i class="fa fa-user-circle" aria-hidden="true"></i>
          <label>user</label>
        </a>
        <a href="/product" className="text-appBar">
          <i class="fa fa-tasks" aria-hidden="true"></i>
          <label>Productos</label>
        </a>
      </div>
    </div>
  );
}
