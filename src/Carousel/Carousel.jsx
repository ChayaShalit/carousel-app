import { useState, useEffect } from "react";
import CarouselItem from "./CarouselItem";
import "./Carousel.css";

export default function Carousel({ images, intervalSeconds = 3 }) {
  const [selected, setSelected] = useState(0);
  const count = images.length;

  // מעבר קדימה (1) או אחורה (-1), עם גלישה מהגבולות
  function move(step) {
    setSelected((prev) => (prev + step + count) % count);
  }

  // מעבר אוטומטי כל intervalSeconds שניות
  useEffect(() => {
    if (count === 0) return;

    const timer = setInterval(() => {
      setSelected((prev) => (prev + 1) % count);
    }, intervalSeconds * 1000);

    // ניקוי: מבטל את הטיימר הישן לפני שנוצר חדש / כשהקרוסלה יורדת מהמסך
    return () => clearInterval(timer);
  }, [selected, intervalSeconds, count]);

  if (count === 0) return null;

  return (
    <div className="carousel">
      {images.map((src, index) =>
        index === selected && (
          <CarouselItem key={index} src={src} alt={`תמונה ${index + 1}`} />
        )
      )}

      <button className="carousel-arrow prev" onClick={() => move(-1)}>
        ❮
      </button>
      <button className="carousel-arrow next" onClick={() => move(1)}>
        ❯
      </button>

      <div className="carousel-dots">
        {images.map((src, index) => (
          <button
            key={index}
            className={index === selected ? "carousel-dot active" : "carousel-dot"}
            onClick={() => setSelected(index)}
          />
        ))}
      </div>
    </div>
  );
}
