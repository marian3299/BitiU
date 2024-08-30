import { Line } from "react-chartjs-2";
import {
  Chart,
  TimeScale,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(
  TimeScale,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const PriceHistoryChart = ({ priceHistory }) => {
  const data = {
    datasets: [
      {
        label: "Price History",
        data: priceHistory.map((item) => ({
          x: new Date(item[0] * 1000),
          y: item[1],
        })),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PriceHistoryChart;
