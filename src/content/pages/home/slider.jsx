import { Carousel } from "@trendyol-js/react-carousel";
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
import "../../../App.css";

export default function Sliders({ data }) {
  const Highlight = ({ children, color }) => (
    <span
      style={{
        backgroundColor: color,
        borderRadius: "2px",
        color: "#fff",
        padding: "90px 0",
        display: "block",
        height: "200px",
        margin: "16px 16px 16px 0",
      }}
    >
      {" "}
      {children}{" "}
    </span>
  );

  return (
    <Carousel
      className={"exampleCarousel1"}
      show={3.5}
      slide={3}
      swiping={true}
    >
      <Highlight color="#2d66c3">We love Web 🌐</Highlight>
      <Highlight color="#f44336">We love Developers 👩🏻‍</Highlight>
      <a target="_blank" href="https://github.com/trendyol/">
        <Highlight color="#d53f8c">This is our github</Highlight>
      </a>
      <a target="_blank" href="https://trendyol.com/">
        <Highlight color="#f27a1a">This is our website</Highlight>
      </a>
      <Highlight color="#16be48">We love Trendyol green</Highlight>
    </Carousel>
  );
}
