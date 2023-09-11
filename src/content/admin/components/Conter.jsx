import AppBarAdmin from "./AppBar";
import './style.css';
export default function ContedAdmin(props) {
  return (
    <div className="conter-admin">
      <AppBarAdmin />
      {props.children}
    </div>
  );
}
