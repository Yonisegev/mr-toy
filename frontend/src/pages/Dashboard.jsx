import React, { useEffect, useState } from 'react';
import { chartService } from '../services/chartService';
import { Doughnut } from 'react-chartjs-2';

export const Dashboard = () => {
  const [avgToyPriceData, setAvgToyPriceData] = useState({});

  useEffect(() => {
    fetchAvgPriceData();
  }, []);

  const fetchAvgPriceData = async () => {
    const data = await chartService.getAvgPriceData();
    setAvgToyPriceData(data);
  };

  const data = {
    labels: [1, 2, 3, 4],
    datasets: [
      {
        labels: [1, 2, 3, 4, 5],
        datasets: [
          {
            label: '# of Votes',
            data: [1, 2, 3, 4, 5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
    },
  };
  if (!avgToyPriceData) return <div>Loading...</div>;
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};
