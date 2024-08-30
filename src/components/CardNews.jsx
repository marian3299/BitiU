import Button from "../utils/Button";

const CardNews = ({ img, link, title }) => {
  //Funcion para el manejo de boton. Al hacer click nos redirige a la noticia
  const handleClick = () => {
    window.open(link, "_blank");
  };
  return (
    <div className="flex flex-col bg-white p-5 w-[400px] gap-3 min-h-[400px]">
      <img src={img} alt={title} className="max-h-[200px]" />
      <h2 className="pb-10 font-bold">{title}</h2>
      <Button onClick={handleClick}>Ir a la nota</Button>
    </div>
  );
};

export default CardNews;
