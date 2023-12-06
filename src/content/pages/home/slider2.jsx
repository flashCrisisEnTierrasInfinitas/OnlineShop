import { Button, Tooltip } from "@mui/material";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import LoupeIcon from "@mui/icons-material/Loupe";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AspectRatio from "@mui/joy/AspectRatio";
import Chip from "@mui/joy/Chip";

import { Carousel } from "flowbite-react";
import Swal from "sweetalert2";

export default function DefaultCarousel({
  data,
  total,
  setTotal,
}) {
  return (
    <Carousel className="carusel2 top-50">
      <div className="conter-vacio">Slide 1</div>
      {data.map((product) => (
        <>
          <div className="card-pro-list">
            <Card key={product.id}>
              <div>
                <Chip color="danger" variant="solid" size="lg">
                  Oferta
                </Chip>
                <h1 className="title-card-list">{product.nombrePro}</h1>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{
                    position: "absolute",
                    top: "0.875rem",
                    right: "0.5rem",
                  }}
                >
                  <BookmarkAdd />
                </IconButton>
              </div>
              <AspectRatio minHeight="120px" maxHeight="400px">
                <img
                  src={product.img}
                  srcSet={product.img}
                  loading="lazy"
                  alt={product.nombrePro}
                />
              </AspectRatio>
              <CardContent orientation="horizontal">
                <div className="text-product">
                  <Typography level="body-xs">Total price:</Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                    ${product.precioPro.toLocaleString("es-CO")}
                  </Typography>
                </div>
                <div className="text-product">
                  <Typography level="body-xs">Total Stock:</Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                    {product.stockPro}
                  </Typography>
                </div>
                <div className="flex boton-product">
                  <Tooltip title="Ver detalle">
                    <a href={`/DetalleProduc/${product.id}`}>
                      <Button variant="contained">
                        <LoupeIcon />
                      </Button>
                    </a>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ))}
    </Carousel>
  );
}
