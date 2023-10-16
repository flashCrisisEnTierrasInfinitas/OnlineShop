import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";

export default function Header({id}) {
    const [data, setData] = useState([]);

    const getDataList = useCallback(async () => {
      try {
        const response = await axios.get(`/categoryProd/${id}`, {
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
      getDataList();
    }, [getDataList]);
  

    return (
            <div className="text-home">
                <a href="#">
                    <p>{data.name}</p>
                    <label>LISTA</label>
                </a>
            </div>
    )
}