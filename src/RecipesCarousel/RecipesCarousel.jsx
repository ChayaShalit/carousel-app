import { useState, useEffect } from "react";
import Carousel from "../Carousel/Carousel";

const URL = "https://dummyjson.com/recipes?limit=6&select=name,image";

export default function RecipesCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadImages() {
      try {
        const response = await fetch(URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`שגיאה בטעינה: ${response.status}`);
        }
        const data = await response.json();
        setImages(data.recipes.map((recipe) => recipe.image));
        setLoading(false);
      } catch (err) {
        // ביטול הבקשה הוא לא שגיאה אמיתית
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      }
    }

    loadImages();

    return () => controller.abort();
  }, []);

  if (loading) return <div className="carousel-message">טוען...</div>;
  if (error) return <div className="carousel-message error">{error}</div>;

  return <Carousel images={images} intervalSeconds={4} />;
}
