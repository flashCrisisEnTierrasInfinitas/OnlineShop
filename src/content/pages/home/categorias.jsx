import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import DiningIcon from "@mui/icons-material/Dining";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

export default function Categorias() {
    return (
        <div className="conter-cate-home top-50">
            <h1 className="color-naranja animate__animated animate__pulse animate__infinite">
                Compra por categorías
            </h1>
            <div className="grid">
                <div className="box-cate-home">
                    <a href="#">
                        <div className="img-cate-home">
                            <OutdoorGrillIcon />
                        </div>
                    </a>
                    <div className="text-cate-home">
                        <h1>Carnes</h1>
                    </div>
                </div>
                <div className="box-cate-home">
                    <a href="#">
                        <div className="img-cate-home">
                            <LocalFloristIcon />
                        </div>
                    </a>
                    <div className="text-cate-home">
                        <h1>Verduras</h1>
                    </div>
                </div>
                <div className="box-cate-home">
                    <a href="#">
                        <div className="img-cate-home">
                            <OfflineBoltIcon />
                        </div>
                    </a>
                    <div className="text-cate-home">
                        <h1>Electrodomesticos</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
