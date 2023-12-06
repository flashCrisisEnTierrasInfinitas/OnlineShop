import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';

export default function BasicModal() {

    // Inicializar el estado open usando localStorage
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const modalsFalse = window.sessionStorage.getItem("modals");

        // Verificar si modalsFalse es igual a "false" como una cadena (no como un booleano)
        if (modalsFalse === "false") {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, []); // El efecto se ejecuta una vez durante la inicialización

    const close = () => {
        window.sessionStorage.setItem("modals", "false"); // Guardar "false" como cadena en localStorage
        setOpen(false); // Establecer el estado en falso
    };


return (
    <React.Fragment>
        <Modal
            open={open}
            onClose={() => close()}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="plain"
                sx={{
                    maxWidth: 800,
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <div className="conter-img-modasl flex">
                    <img src="https://www.eluniversal.com.co/binrepository/1050x700/0c0/0d0/none/13704/XRID/36490753-xl_2540139_20191229165839.jpg" />
                </div>
            </Sheet>
        </Modal>
    </React.Fragment>
);
}