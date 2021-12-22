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
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
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
