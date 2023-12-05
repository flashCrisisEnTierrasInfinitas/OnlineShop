import { CSpinner } from "@coreui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Table from "./table";

export default function Shop({ Seccion, token }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const form ={
    status:'200'
  }

  const getShop = async () => {
    try {
      const response = await axios.post(`/shopss/${Seccion}`,form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getShop();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }

  return (
    <div className="conter-detallepro margin-90">
      <div className="flex">
        <h1>Mi carrito {Seccion}</h1>
      </div>
      <Table data={data}/>
    </div>
  );
}
