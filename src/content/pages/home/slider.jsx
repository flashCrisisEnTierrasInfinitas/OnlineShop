import { Carousel } from "@trendyol-js/react-carousel";
import { Button } from "@mui/material";


export default function Sliders({data}) {
  return (
    <Carousel
      className={"exampleCarousel1"}
      show={3.5}
      slide={2}
      transition={0.5}
    >
      {data.map((data) => (
        <div
          className="box-slider-noticias"
          style={{
            backgroundImage: "",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <img src={data.img} />
          <div className="text-container">
            <h2>{data.title}</h2>
            <p>{data.tetx}</p>
            <Button  variant="contained">DETALLES</Button>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
