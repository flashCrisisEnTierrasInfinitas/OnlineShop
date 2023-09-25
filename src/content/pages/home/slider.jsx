import { Carousel } from "@trendyol-js/react-carousel";

const data = [
  {
    id: "0",
    img: "img/micro-profesional.jpg",
    title:
      "4 Mitos Comunes sobre la Venta de Soluciones de Potencia para Racks",
    tetx: "3 desafíos de volatilidad energética en centros de datos",
  },
  {
    id: "1",
    img: "https://www.elespectador.com/pf/resources/images/redes_espectador.jpg?d=745",
    title: "Centros de datos perimetrales para llevar",
    tetx: "3 desafíos de volatilidad energética en centros de datos",
  },
  {
    id: "2",
    img: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_39/3025091/telemundo-noticias-social.png",
    title:
      "Seis consejos de trabajo brillantes para trabajar de forma inteligente",
    tetx: "3 desafíos de volatilidad energética en centros de datos",
  },
  {
    id: "3",
    img: "https://www.futbolred.com/files/article_main/files/crop/uploads/2020/04/21/5e9f997f6f621.r_1587553563373.71-0-1021-476.jpeg",
    title: "6 claves para hacer que su negocio sea más sostenible",
    tetx: "3 desafíos de volatilidad energética en centros de datos",
  },
];

export default function Sliders() {
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
          </div>
        </div>
      ))}
    </Carousel>
  );
}
