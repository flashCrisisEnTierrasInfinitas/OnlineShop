import { Carousel } from "@trendyol-js/react-carousel";
import { Button, Tooltip } from "@mui/material";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import LoupeIcon from '@mui/icons-material/Loupe';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AspectRatio from '@mui/joy/AspectRatio';
import Chip from '@mui/joy/Chip';

export default function Sliders({ data }) {
    return (
        <Carousel
            className={"exampleCarousel1"}
            show={3.5}
            slide={2}
            transition={0.5}
        >
            {data.map((product) => (
                <div
                    className="box-slider-noticias"
                    style={{
                        backgroundImage: "",
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                    }}
                >
                    <Card sx={{ height: '100%' }} key={product.id}>
                        <div>
                        <Chip color="danger"   variant="solid">OFERTA</Chip>
                            <Typography level="title-lg">{product.nombrePro}</Typography>
                            <Typography level="body-sm">{product.descripPro}</Typography>
                            <IconButton
                                aria-label="bookmark Bahamas Islands"
                                variant="plain"
                                color="neutral"
                                size="sm"
                                sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                            >
                                <BookmarkAdd />
                            </IconButton>
                        </div>
                        <AspectRatio minHeight="120px" maxHeight="200px">
                            <img
                                src={product.img}
                                srcSet={product.img}
                                loading="lazy"
                                alt={product.nombrePro}
                            />
                        </AspectRatio>
                        <CardContent orientation="horizontal">
                            <div>
                                <Typography level="body-xs">Total price:</Typography>
                                <Typography fontSize="lg" fontWeight="lg">
                                    ${product.precioPro}
                                </Typography>
                            </div>
                            <div className="flex">
                                <Tooltip title="Agregar al carrito">
                                    <Button variant="contained" color='warning'>
                                        <AddShoppingCartIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Ver detalle">
                                    <Button variant="contained">
                                        <LoupeIcon />
                                    </Button>
                                </Tooltip>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Carousel>
    );
}
