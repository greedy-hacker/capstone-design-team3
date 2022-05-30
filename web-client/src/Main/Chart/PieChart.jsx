import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart as ChartJs, registerables } from 'chart.js';

ChartJs.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'Language Distribution',
      font: {
        size: '20pt'
      }
    },
  },
};



export function PieChart({languageCount}) {
  const n = languageCount.length;
  const data = {
    labels:languageCount.map(l => l.language),
    datasets: [
      {
        label: '# of Votes',
        data: languageCount.map(l => l.count),
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
  };

  return <Pie data={data} options={options}/>;
}
