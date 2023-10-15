import { CSpinner } from "@coreui/react";
import Header from "./Header";
import Conted from "./conted";
import axios from "axios";
import isMountedRef from "../../../../hooks/useRefMounted";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  var token = Cookies.get('token');
  const id = Cookies.get("id");

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/users/${id}`, {
        headers: {
            "Content-Type": "multipart/form-data",
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + token,
          },
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getDataList();
  }, [getDataList]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="danger" />
      </div>
    );
  }

  return (
    <>
      <div className="header-pay">
        <Header />
      </div>
      <Conted data={data}/>
    </>
  );
}
