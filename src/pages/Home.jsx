import { useEffect, useState } from "react";
import Card from "../components/Card";
import ModalChart from "../components/ModalChart";
import { apiKey, urlCoins } from "../utils/constans";
import LoadingState from "../utils/LoadingState";

const Home = () => {
  const [coins, setCoins] = useState([]); //Estado de la data que recibimos de la API
  const [openModalChart, setOpenModalChart] = useState(false); //Estado para abrir el modal
  const [selectedCoinId, setSelectedCoinId] = useState(null); //Estado para cerrar el modal
  const [loading, setLoading] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  };

  //Llamado a la API para obtener informacion de las monedas
  useEffect(() => {
    setLoading(true);
    fetch(urlCoins, options)
      .then((response) => response.json())
      .then((data) => {
        setCoins(data.result);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  //Funcion para manejar el click del boton y recibir el id de la moneda
  const handleInfoClick = (coinId) => {
    setOpenModalChart(true);
    setSelectedCoinId(coinId);
  };

  //Funcion de manejo de cierre del modal
  const handleCloseModalChart = () => setOpenModalChart(false);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <section className="bg-gray-300 w-full min-h-dvh flex flex-col justify-center mt-7 py-10 gap-5 items-center lg:flex-row flex-wrap">
        {coins.map((coin) => {
          const { id, name, icon, price, symbol } = coin;
          return (
            <Card
              key={id}
              name={name}
              img={icon}
              price={price}
              symbol={symbol}
              handleInfoClick={() => handleInfoClick(id)}
            />
          );
        })}
      </section>
      <ModalChart
        openModalChart={openModalChart}
        closeModalChart={handleCloseModalChart}
        coinId={selectedCoinId}
      />
    </>
  );
};

export default Home;
