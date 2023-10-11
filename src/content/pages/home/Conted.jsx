import { Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Conted() {
  return (
    <div className="resul-home">
      <div className="text-resul">
        <h1>Asupro Colombia</h1>
        <p>Venta de productos de la canasta familiar, entre otros.</p>
        <div className="boton-product">
          <Button variant="contained">Login</Button>
          <Button variant="outlined">Empecemos <ExpandMoreIcon/></Button>
        </div>
      </div>
      <div className="img-resul">
        <div>
          <img
            src="/img/backgroud/undraw_shopping_app_flsj.svg"
            alt="img-resul"
          />
        </div>
      </div>
    </div>
  );
}
