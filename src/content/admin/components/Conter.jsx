import AppBarAdmin from "./AppBar";
import './style.css';
export default function ContedAdmin(props) {
  return (
    <div className="conter-admin">
      <div className="app-conted"><AppBarAdmin /></div>
      <div className="hijos-conted">{props.children}</div>
    </div>
  );
}
