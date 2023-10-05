import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import { Button, ButtonGroup } from "@mui/joy";

export default function Filter({ setFilter, filter, id }) {
  const [data, setData] = useState([]);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/categoryProd`, {
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
    localStorage.setItem("key", id);
  };

  return (
    <div className="conter-filter">
      <h1>Filtrar por:</h1>
      <div className="conter-bot-filter">
        <ButtonGroup orientation="vertical">
          <Button>Todo</Button>
          {data.map((data) => (
            <Button onClick={() => onChangeFilter(data.id)} variant="outlined">
              {data.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
