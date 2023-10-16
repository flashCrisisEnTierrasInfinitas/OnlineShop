import React, { useState } from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PaidIcon from "@mui/icons-material/Paid";
import Drawer from "@mui/joy/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { CSpinner } from "@coreui/react";
import { Button, Tooltip } from "@mui/joy";

export default function Drawers({ }) {
    const [Drawes, setDrawes] = useState(false);

    return (
        <>
            <Button onClick={() => setDrawes(!Drawes)} color="success">
                Proceder al pago
            </Button>
            <Drawer open={Drawes} anchor="bottom" size="sx">
                <div className="header-drawes">
                    <Button onClick={() => setDrawes(!Drawes)} variant="text">
                        <CloseIcon />
                    </Button>
                </div>
                <div className="conter-drawes">
                    <div>
                        <Tooltip title="Recoger en oficina">
                            <a href="/oficina">
                                <Button>
                                    <AddBusinessIcon />
                                </Button>
                            </a>
                        </Tooltip>
                    </div>
                    <div>
                        <a href="/pay">
                            <Tooltip title="Envio hasta la puerta de tu casa">
                                <Button color="danger">
                                    <PaidIcon />
                                </Button>
                            </Tooltip>
                        </a>
                    </div>
                </div>
            </Drawer>
        </>
    );
}
