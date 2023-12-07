import { Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Conted() {
  return (
    <div className="resul-home grid">
      <div className="text-resul">
        <h1>Asupro Colombia</h1>
        <p>Venta de productos de la canasta familiar, entre otros.</p>
        <div className="boton-product">
          <a href="/login">
            <Button variant="contained">Login</Button>
          </a>
          <a href="#searchPro">
            <Button variant="outlined">
              Empecemos <ExpandMoreIcon />
            </Button>
          </a> 
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
