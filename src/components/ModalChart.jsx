import { AiFillCloseCircle } from "react-icons/ai";
import PriceHistoryChart from "../utils/PriceHistoryChart";
import { useEffect, useState } from "react";
import { apiKey, urlCoins } from "../utils/constans";

const ModalChart = ({ openModalChart, closeModalChart, coinId }) => {
  const [coinInfo, setCoinInfo] = useState({}); //Estado de la data de la moneda
  const [priceHistory, setPriceHistory] = useState([]); //Estado de la data del historial de precios
  const [loading, setLoading] = useState(false); //Estado para verificar se ya se realizo la peticion asincrona
  const [todayPrice, setTodayPrice] = useState(null); //Estado para guardar el valor actual de la moneda

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  };

  //Funcion para buscar el precio de la moneda en la fecha actual
  function getPriceForToday(data) {
    // Obtener la fecha actual en formato timestamp
    const now = Math.floor(Date.now() / 1000);

    // Buscar el valor más cercano a la fecha actual
    let closestDate = null;
    let closestPrice = null;

    for (const [timestamp, price] of data) {
      if (
        closestDate === null ||
        Math.abs(timestamp - now) < Math.abs(closestDate - now)
      ) {
        closestDate = timestamp;
        closestPrice = price;
      }
    }

    // Retornar el precio correspondiente
    return closestPrice.toFixed(2);
  }

  //Llamado de las APIs para obtener el hisotrial de precios en el mes
  useEffect(() => {
    if (openModalChart && coinId) {
      setLoading(true);
      const historyUrl = urlCoins + `/${coinId}/charts?period=1m`;
      const coinDataUrl = urlCoins + `/${coinId}`;

      Promise.all([
        fetch(historyUrl, options).then((response) => response.json()),
        fetch(coinDataUrl, options).then((response) => response.json()),
      ])
        .then(([historyData, coinData]) => {
          setPriceHistory(historyData);
          setCoinInfo({
            name: coinData.name,
            price: coinData.price.toFixed(2),
          });
          const todayPrice = getPriceForToday(historyData);
          setTodayPrice(todayPrice);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [openModalChart, coinId]);

  //Renderizado mientras recibimos la informacion de la API
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center p-5 fixed inset-0 overflow-x-auto visible bg-black/20">
        <div className="max-h-min rounded-lg max-w-[360px] bg-white p-5 flex gap-5">
          <h3>Cargando...</h3>
          <button onClick={closeModalChart}>
            <AiFillCloseCircle className="cursor-pointer text-3xl" />
          </button>
        </div>
      </div>
    );
  }

  const { name } = coinInfo;

  return (
    <div
      className={`flex flex-col p-5 justify-center items-center fixed inset-0 overflow-x-auto ${
        openModalChart ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div className="max-h-min relative rounded-lg max-w-[360px] lg:min-w-[700px] bg-white p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="flex justify-between ">
          <h3 className="font-bold">{name}</h3>
        </div>
        <button onClick={closeModalChart} className="absolute top-2 right-2">
          <AiFillCloseCircle className="cursor-pointer text-3xl" />
        </button>
        <hr className="h-1" />
        <p>Precio actual: ${todayPrice}</p>
        <PriceHistoryChart priceHistory={priceHistory} />
      </div>
    </div>
  );
};

export default ModalChart;
