import { useCallback, useEffect, useState } from "react";
import isMountedRef from "../../../../hooks/useRefMounted";
import { CSpinner } from "@coreui/react";
import axios from "axios";
import Alert from "@mui/joy/Alert";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import WarningIcon from "@mui/icons-material/Warning";
import Close from "@mui/icons-material/Close";

export default function DetalleProduc() {
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: index.js:10 ~ DetalleProduc ~ data:", data);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDataList = useCallback(async () => {
    try {
      const response = await axios.get(`/product/32`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
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
    <div className="conter-detallepro">
      <header>
        <div>
          <Alert
            size="lg"
            color="success"
            variant="solid"
            invertedColors
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                  boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
                }}
              >
                <div>
                  <WarningIcon fontSize="xl2" />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                variant="plain"
                sx={{
                  "--IconButton-size": "32px",
                  transform: "translate(0.5rem, -0.5rem)",
                }}
              >
                <Close />
              </IconButton>
            }
            sx={{ alignItems: "flex-start", overflow: "hidden" }}
          >
            <div>
              <Typography level="title-lg">Warning</Typography>
              <Typography>
                Este producto se cobra por peso. El precio total en esta orden
                es estimado y dependerá del peso final al momento de preparar su
                orden.
              </Typography>
            </div>
            <LinearProgress
              variant="soft"
              value={40}
              sx={(theme) => ({
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                color: `rgb(${theme.vars.palette.success.lightChannel} / 0.72)`,
                "--LinearProgress-radius": "0px",
              })}
            />
          </Alert>
        </div>
        <h1>{data.nombrePro}</h1>
        <p>1 lb</p>
        <p>${data.precioPro.toLocaleString("es-CO")}</p>
      </header>
      <div>
        <img src={data.img} alt={data.nombrePro} />
      </div>
      <div>
        <h3 className="color-gray">{data.descripPro}</h3>
      </div>
      <div>
        
      </div>
    </div>
  );
}
