import {Bar} from 'react-chartjs-2';
import {Chart as ChartJs, registerables} from 'chart.js';

ChartJs.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Category Distribution',
      font: {
        size: '20pt'
      }
    },
  },
};

const data = {
  datasets: [
    {
      type: 'bar',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      data: [
        {x: 'unknown', y: 170},
        {x: 'adult', y: 170},
        {x: 'drug', y: 200},
        {x: 'gambling', y: 120},
        {x: 'weapon', y: 15},
        {x: 'murder', y: 6},
        {x: 'info-leak', y: 6},
      ],
    },
  ],
};
export const BarChart = () => {
  return (
      <Bar data={data} options={options} />
  );
};

