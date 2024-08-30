import { AiFillCloseCircle } from "react-icons/ai";
import PriceHistoryChart from "../utils/PriceHistoryChart";
import { useEffect, useState } from "react";

const ModalChart = ({ openModalChart, closeModalChart, coinId }) => {
  const [coinInfo, setCoinInfo] = useState({});
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = "65XZjBtp1BCU5zWkG1ocSn14ZmgoqDjrVXoNEhkjatY=";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  };

  useEffect(() => {
    if (openModalChart && coinId) {
      setLoading(true);
      const historyUrl = `https://openapiv1.coinstats.app/coins/${coinId}/charts?period=1m`;
      const coinDataUrl = `https://openapiv1.coinstats.app/coins/${coinId}`;

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
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [openModalChart, coinId]);

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

  const { name, price } = coinInfo;

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
        <p>Precio actual: ${price}</p>
        <PriceHistoryChart priceHistory={priceHistory} />
      </div>
    </div>
  );
};

export default ModalChart;
