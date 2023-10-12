import Swal from "sweetalert2";
import BackupIcon from "@mui/icons-material/Backup";
import { Button } from "@mui/joy";

export default function Conted({
  setAllproducts,
  setCountProducts,
  total,
  setTotal,
}) {
  const Update = () => {
    setAllproducts([]);
    setTotal(0);
    setCountProducts(0);
    return Swal.fire({
      position: "center",
      icon: "info",
      title: "Su información se validará, para hacer el respectivo envió¡!",
      showConfirmButton: false,
      timer: 1900,
    });
  };

  return (
    <div className="conter-pay margin-90 top-50">
      <p>
        Para proceder con el pago, consigne el monto total de su compra al
        número de cuenta:<span className="color-secondary">311533906</span>su
        monto total es: <span className="color-secondary">${total}</span>
      </p>
      <div className="top-50 bottom-50">
        <form className="grid  margin-90">
          <div>
            <input
              type="text"
              placeholder="Direccion del envio"
              class="form-control"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Numero de telefono"
              class="form-control"
            />
          </div>
        </form>
      </div>
      <div className="top-50">
        <div className="logos-pay">
          <div>
            <img src="img/icons/nequi-2.svg" />
          </div>
          <div>
            <img src="img/icons/daviplata.svg" />
          </div>
        </div>
      </div>
      <p className="top-50">
        Puedes hacer tu transferencia a través de nuestros dos métodos de pago,
        toma captura del pago y súbelo en este recuadro¡!
      </p>
      <div className="box-file">
        <div className="drag-file-area">
          <i class="fa fa-cloud-upload" aria-hidden="true"></i>
          <p>Arrastra y suelta cualquier archivo aquí</p>
          <input type="file" id="fileInput" class="custom-file-input" />
          <label for="fileInput" class="custom-file-label"></label>
        </div>
        <Button onClick={() => Update()}>
          <BackupIcon />
        </Button>
      </div>
    </div>
  );
}
