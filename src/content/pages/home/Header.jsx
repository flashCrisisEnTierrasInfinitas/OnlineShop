import { Button } from "@mui/material";

export default function Header() {
    return (
        <div className="text-home">
            <a className='searchPro top-50' id="searchPro">
                <p>TIENDA</p>
                <label>ASUPRO</label>
            </a>
            <div className="margin-90">
                <h4 className="color-naranja animate__animated animate__pulse animate__infinite top-20">
                    Las Tiendas <strong>ASUPRO COLOMBIA</strong> proporcionan a todos sus clientes una amplia variedad de opciones, ofreciendo comodidad y acceso las 24 horas día,  para seleccionar sus productos y servicios.
                </h4> <a href="/login">
                    <Button variant="contained" style={{ background: '#2D477C' }}>Login</Button>
                </a>
            </div>
        </div>
    )
}