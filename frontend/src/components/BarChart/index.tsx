import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/requests';

type SeriesData = {
  name: string;
  data: number[];

}

type ChartData = {
  labels: {
    categories: string[];
  };
  series: SeriesData[];

}

const BarChart = () => {
  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
  };

  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: []
    },
    series: [
      {
        name: "",
        data: [],
      }
    ]
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-seller`)
      .then(response => {
        const data = response.data as SaleSuccess[];
        const myLabels = data.map(l => l.sellerName);
        const mySeries = data.map(s => round(100.0 * s.deals / s.visited, 1));
        setChartData({
          labels: {
            categories: myLabels
          },
          series: [
            {
              name: "% Succeces",
              data: mySeries
            }
          ]
        });
      });

  }, []);

  // const mockData = {
  //     labels: {
  //         categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  //     },
  //     series: [
  //         {
  //             name: "% Sucesso",
  //             data: [43.6, 67.1, 67.7, 45.6, 71.1]                   
  //         }
  //     ]
  // };
  return (
    <Chart options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
}

export default BarChart
  ;
