import { useEffect, useState } from "react";
import CardNews from "../components/CardNews";
import { apiKey, urlNews } from "../utils/constans";
import LoadingState from "../utils/LoadingState";

const Blog = () => {
  const [news, setNews] = useState([]); //Estado de la data que reibimos de la API
  const [loading, setLoading] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  };

  //Funcion que verifica si la imagen de cada noticia es valida
  const isValidImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  //Llamado a la API
  useEffect(() => {
    setLoading(true);
    fetch(urlNews, options)
      .then((response) => response.json())
      .then(async (data) => {
        // Filtramos las noticias que tienen imágenes válidas
        const validNewsPromises = data.result.map(async (newItem) => {
          const isImageValid = await isValidImage(newItem.imgUrl);
          return isImageValid ? newItem : null;
        });

        const validNews = (await Promise.all(validNewsPromises)).filter(
          Boolean
        );
        setNews(validNews);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <section className="bg-gray-300 w-full min-h-dvh flex flex-col justify-center mt-7 py-10 gap-5 items-center lg:flex-row flex-wrap">
        {news.map((newItem) => {
          const { id, imgUrl, link, title } = newItem;
          return <CardNews key={id} img={imgUrl} link={link} title={title} />;
        })}
      </section>
    </>
  );
};

export default Blog;
