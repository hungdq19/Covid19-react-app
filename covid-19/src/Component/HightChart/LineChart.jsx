import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment';
import { Box, Button, ButtonGroup } from '@material-ui/core';

LineChart.propTypes = {
   data: PropTypes.array.isRequired,
};
const generateOption = (data = []) => {
   const categories = data.map((x) => moment(x.Date).format('DD/MM/YYYY'));
   return {
      chart: {
         height: 500,
      },
      title: {
         text: 'TEST_COVID_19_HUNGDQ19',
      },
      xAxis: {
         categories: categories,
         crosshair: true,
      },
      colors: ['#F3585B'],
      yAxis: {
         min: 0,
         title: {
            text: null,
         },
         labels: {
            align: 'right',
         },
      },
      tooltip: {
         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
         pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
         footerFormat: '</table>',
         shared: true,
         useHTML: true,
      },
      plotOptions: {
         column: {
            pointPadding: 0.2,
            borderWidth: 0,
         },
      },
      series: [
         {
            name: 'DỮ LIÊU CA NHIỄM COVID-19',
            data: data.map((item) => item.Confirmed),
         },
      ],
   };
};

function LineChart({ data = [] }) {
   const [option, setOption] = useState({});
   const [filterDate, setFilterDate] = useState('');


   useEffect(() => {
      let customData = [];
      switch (filterDate) {
         case 'all':
            customData = data;
            break;
         case '30':
            customData = data.slice(data.length - 30);
            break;
         case '7':
            customData = data.slice(data.length - 7);
            break;
         default:
            customData = data;
            break;
      }
      const newOption = generateOption(customData);
      setOption(newOption);
   }, [data, filterDate]);

   
   return (
      <Box>
         <ButtonGroup size="small" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setFilterDate('all')}>Tất Cả</Button>
            <Button onClick={() => setFilterDate('30')}>30 Ngày</Button>
            <Button onClick={() => setFilterDate('7')}>7 Ngày</Button>
         </ButtonGroup>
         <HighchartsReact highcharts={Highcharts} options={option} />
      </Box>
   );
}

export default LineChart;
