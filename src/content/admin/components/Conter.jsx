import Toast from "../dahsboard/toast";
import AppBarAdmin from "./AppBar";
import './style.css';
export default function ContedAdmin(props) {
  return (
    <div className="conter-admin">
      <div><AppBarAdmin/></div>
      <Toast/>
      <div className="hijos-conted">{props.children}</div>
    </div>
  );
}
