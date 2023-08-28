export default function Conted() {
    return (
        <div className="conter-pay margin-90 top-50">
            <p>Para proceder con el pago, consigne el monto total de su compra al número de cuenta:<span className="color-secondary">311533906</span></p>
            <div className="logos-pay">
                <div><img src="img/icons/nequi-2.svg" /></div>
                <div><img src="img/icons/daviplata.svg" /></div>
            </div>
            <p className="top-50">Puedes hacer tu transferencia a través de nuestros dos métodos de pago, toma captura del pago y súbelo en este recuadro¡!</p>
            <div className="box-file">
                <div className="drag-file-area">
                    <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                    <p>Arrastra y suelta cualquier archivo aquí</p>
                    <input type="file" id="fileInput" class="custom-file-input" />
                    <label for="fileInput" class="custom-file-label"></label>
                </div>
                <button className="btn1 btn-primary">Upload</button>
            </div>

        </div>
    )
}