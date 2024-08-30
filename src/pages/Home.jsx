import { useEffect, useState } from "react";
import Card from "../components/Card";
import ModalChart from "../components/ModalChart";
import { apiKey, urlCoins } from "../utils/constans";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [openModalChart, setOpenModalChart] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  };

  useEffect(() => {
    fetch(urlCoins, options)
      .then((response) => response.json())
      .then((data) => setCoins(data.result))
      .catch((err) => console.error(err));
  }, []);

  const handleInfoClick = (coinId) => {
    setOpenModalChart(true);
    setSelectedCoinId(coinId);
  };

  const handleCloseModalChart = () => setOpenModalChart(false);

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
