import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import isMountedRef from '../../../hooks/useRefMounted';

export default function ListCategorias({ id }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // ...

  const getUsuarios = useCallback(async () => {
    try {
      const response = await axios.get(`/categoryProd/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError(err); // Puedes almacenar el error en el estado
    }
  }, [isMountedRef, id]);

  useEffect(() => {
    getUsuarios();
  }, [getUsuarios]);

  // ...

  return (
    <>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))
      ) : (
        <div>No hay datos disponibles.</div>
      )}
    </>
  );
}

