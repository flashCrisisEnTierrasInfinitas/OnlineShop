import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import isMountedRef from "../../../hooks/useRefMounted";

export default function Categorias() {
    const [data, setData] = useState([]);

    const getCategoriList = useCallback(async () => {
        try {
            const response = await axios.get(`/listActiveCategory`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setData(response.data);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);
    useEffect(() => {
        getCategoriList();
    }, [getCategoriList]);

    return (
        <div className="conter-cate-home top-50">
            <h1 className="color-naranja animate__animated animate__pulse animate__infinite">
                Compra por categorías
            </h1>
            <div className="grid">
                {data.map(data => (
                    <div className="box-cate-home">
                        <a href="#">
                            <div
                                className="img-cate-home"
                                dangerouslySetInnerHTML={{
                                    __html: data.ico
                                }}
                            />
                        </a>
                        <div className="text-cate-home">
                            <h1>{data.name}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
