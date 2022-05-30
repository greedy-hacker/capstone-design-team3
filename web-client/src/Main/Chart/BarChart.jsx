import {Bar} from 'react-chartjs-2';
import {Chart as ChartJs, registerables} from 'chart.js';
import {CategoryCount} from "../../SWRHooks/useCategoryCount";

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

export const BarChart = ({categoryCount}) => {
  const data = {
    datasets: [
      {
        type: 'bar',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        data: [
          {x: 'unknown', y: 0},
          {x: 'adult', y: 0},
          {x: 'hacking', y: 0},
          {x: 'drug', y: 0},
          {x: 'gambling', y: 0},
          {x: 'weapon', y: 0},
          {x: 'violence', y: 0},
          {x: 'counterfeit', y: 0},
        ],
      },
    ],
  };
  categoryCount.forEach(c => {
    if (c.category === '') {
      data.datasets[0].data[0].y = c.count;
      return;
    }
    data.datasets[0].data.find(d => d.x === c.category).y = c.count;
  })
  return (
      <Bar data={data} options={options} />
  );
};

