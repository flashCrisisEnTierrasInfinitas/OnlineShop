import { Chip, Tooltip } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SendIcon from "@mui/icons-material/Send";
import GppBadIcon from "@mui/icons-material/GppBad";
import Edit from "./edit";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Alertas({ data, getDataList }) {
    const cancelData = {
        status_venta: 1,
    };
    const enviarData = {
        status_venta: 2,
    };
    const entregarData = {
        status_venta: 3,
    };

    const CancelStatus = async (id) => {
        const response = await axios.put(`/ventas/${id}`, cancelData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                " X-Requested-With": "XMLHttpRequest",
            },
        });
        console.log(response);
        getDataList();
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Update Event'
        })
    };
    const EntregadoStatus = async (id) => {
        const response = await axios.put(`/ventas/${id}`, entregarData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                " X-Requested-With": "XMLHttpRequest",
            },
        });
        console.log(response);
        getDataList();
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Update Event'
        })
    };
    const EnviarStatus = async (id) => {
        alert("venta cancelada", id);

        const response = await axios.put(`/ventas/${id}`, enviarData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                " X-Requested-With": "XMLHttpRequest",
            },
        });
        console.log(response);
        getDataList();
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Update Event'
        })
    };

    const TypeService = ({ data }) => {
        if (data == 0) {
            return <Chip label="Entregar" color="primary" />;
        }
        if (data == 1) {
            return <Chip label="Enviar" color="success" />;
        }
    };

    const Direccion = ({ data }) => {
        if (data.tipo_servicio == 1) {
            return (
                <>
                    <label>Direccion:</label>
                    <label>{data.direccion}</label>
                </>
            )
        }
    };

    const Icons = ({ data }) => {
        if (data.status_venta == 0) {
            return (
                <>
                    <Tooltip title="Cancelar">
                        <button className="btn" onClick={() => CancelStatus(data.id)}>
                            <HighlightOffIcon />
                        </button>
                    </Tooltip>
                    {data.tipo_servicio === 0 && (
                        <Tooltip title="Entregar">
                            <button className="btn" onClick={() => EntregadoStatus(data.id)}>
                                <DoneAllIcon />
                            </button>
                        </Tooltip>
                    )}
                    {data.tipo_servicio === 1 && (
                        <Tooltip title="Enviar">
                            <button className="btn" onClick={() => EnviarStatus(data.id)}>
                                <SendIcon />
                            </button>
                        </Tooltip>
                    )}
                </>
            );
        }
        if (data.status_venta == 2) {
            return (
                <Tooltip title="Entregar">
                    <button className="btn" onClick={() => EntregadoStatus(data.id)}>
                        <DoneAllIcon />
                    </button>
                </Tooltip>
            );
        }
    };

    if (data.status_venta == 0) {
        return (
            <div className="alerta" style={{ background: "rgb(237, 108, 2)" }}>
                <div className="conter-alerta">
                    <div className="ico-alerta">
                        <GppBadIcon />
                    </div>
                    <div className="text-alerta">
                        <strong>sin entrega</strong>
                        <div>
                            <label>Usuario:</label>
                            <label>{data.user_compra}</label>
                        </div>
                        <div>
                            <label>codigo venta:</label>
                            <Chip label={data.id} color="primary" />
                        </div>
                        <div>
                            <label>Tipo Servicio:</label>
                            <TypeService data={data.tipo_servicio} />
                        </div>
                        <div>
                            <Direccion data={data} />
                        </div>
                    </div>
                    <div className="ico-daly">
                        <Icons data={data} />
                        <Edit data={data} />
                    </div>
                </div>
            </div>
        );
    }
    if (data.status_venta == 1) {
        return (
            <div className="alerta" style={{ background: "rgb(211, 47, 47)" }}>
                <div className="conter-alerta">
                    <div className="ico-alerta">
                        <GppBadIcon />
                    </div>
                    <div className="text-alerta">
                        <strong>rechazado</strong>
                        <div>
                            <label>Usuario:</label>
                            <label>{data.user_compra}</label>
                        </div>
                        <div>
                            <label>codigo venta:</label>
                            <Chip label={data.id} color="primary" />
                        </div>
                        <div>
                            <label>Tipo Servicio:</label>
                            <TypeService data={data.tipo_servicio} />
                        </div>
                        <div>
                            <Direccion data={data} />
                        </div>
                    </div>
                    <div className="ico-daly">
                        <Icons data={data} />
                        <Edit data={data} />
                    </div>
                </div>
            </div>
        );
    }
    if (data.status_venta == 2) {
        return (
            <div className="alerta" style={{ background: "rgb(2, 136, 209)" }}>
                <div className="conter-alerta">
                    <div className="ico-alerta">
                        <GppBadIcon />
                    </div>
                    <div className="text-alerta">
                        <strong>enviado</strong>
                        <div>
                            <label>Usuario:</label>
                            <label>{data.user_compra}</label>
                        </div>
                        <div>
                            <label>codigo venta:</label>
                            <Chip label={data.id} color="primary" />
                        </div>
                        <div>
                            <label>Tipo Servicio:</label>
                            <TypeService data={data.tipo_servicio} />
                        </div>
                        <div>
                            <Direccion data={data} />
                        </div>
                    </div>
                    <div className="ico-daly">
                        <Icons data={data} />
                        <Edit data={data} />
                    </div>
                </div>
            </div>
        );
    }
    if (data.status_venta == 3) {
        return (
            <div className="alerta" style={{ background: "rgb(46, 125, 50)" }}>
                <div className="conter-alerta">
                    <div className="ico-alerta">
                        <GppBadIcon />
                    </div>
                    <div className="text-alerta">
                        <strong>entregado</strong>
                        <div>
                            <label>Usuario:</label>
                            <label>{data.user_compra}</label>
                        </div>
                        <div>
                            <label>codigo venta:</label>
                            <Chip label={data.id} color="primary" />
                        </div>
                        <div>
                            <label>Tipo Servicio:</label>
                            <TypeService data={data.tipo_servicio} />
                        </div>
                        <div>
                            <Direccion data={data} />
                        </div>
                    </div>
                    <div className="ico-daly">
                        <Icons data={data} />
                        <Edit data={data} />
                    </div>
                </div>
            </div>
        );
    }
}
