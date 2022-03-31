import {Box, Container, Paper} from "@mui/material";
import {ArgumentAxis, Chart, ValueAxis, BarSeries, Title} from "@devexpress/dx-react-chart-material-ui";
import {Animation} from '@devexpress/dx-react-chart';

const data = [
  {category: 'adult', count: 170},
  {category: 'drug', count: 200},
  {category: 'gambling', count: 120},
  {category: 'info-leak', count: 45},
  {category: 'weapon', count: 15},
  {category: 'murder', count: 6},
];

export function BarChart() {
  return (
    <Box sx={{border: '1px solid black'}}>
      <Chart data={data}>
        <ArgumentAxis/>
        <ValueAxis/>
        <BarSeries
          valueField="count"
          argumentField="category"
        />
        <Title text="Frequency"/>
        <Animation/>
      </Chart>
    </Box>
  )
}