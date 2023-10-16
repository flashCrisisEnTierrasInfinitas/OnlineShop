import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import { Button, ButtonGroup } from "@mui/joy";

export default function Filter({ setIdFilter,id }) {
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

  const onChangeFilter = (id) => {
    setIdFilter(id);
  };

  return (
    <>
      <h1>Filtrar por:</h1>
      <div>
        <ButtonGroup orientation="vertical">
          <Button>Todo</Button>
            <Button onClick={() => onChangeFilter(data.id)} variant="outlined">
              {data.name}
            </Button>
        </ButtonGroup>
      </div>
    </>
  );
}
