import React from 'react';
import PropTypes from 'prop-types';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highchartsMap from 'highcharts/modules/map';
import { useState, useEffect, useRef } from 'react';
import { cloneDeep } from 'lodash';
highchartsMap(Highcharts);
HighChartMap.propTypes = {
   mapdata: PropTypes.object,
};
const initOptions = {
   chart: {
      height: '500',
   },
   title: {
      text: null,
   },
   mapNavigation: {
      enabled: true,
   },
   colorAxis: {
      min: 0,
      stops: [
         [0.2, '#FFC4AA'],
         [0.4, '#FF8A66'],
         [0.6, '#FF392B'],
         [0.8, '#B71525'],
         [1, '	#7A0826'],
      ],
   },
   legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'bottom',
   },
   series: [
      {
         name: 'Dân số',
         joinBy: ['hc-key', 'key'],
      },
   ],
};
function HighChartMap({ mapdata }) {
   const [option, setOption] = useState({});
   const [mapLoaded, setMapLoaded] = useState(false);
   const chartRef = useRef(null);
   useEffect(() => {
      if (mapdata && Object.keys(mapdata).length) {
         console.log({ mapdata });
         const fakeData = mapdata.features.map((feature, index) => ({
            key: feature.properties['hc-key'],
            value: index,
         }));
         setOption({
            ...initOptions,
            series: [
               {
                  ...initOptions.series[0],
                  mapdata: mapdata,
                  data: fakeData,
               },
            ],
         });
         if (!mapLoaded) setMapLoaded(true);
      }
   }, [mapdata, mapLoaded]);

   useEffect(() => {
      if (chartRef && chartRef.current) {
         chartRef.current.chart.series[0].update({
            mapdata,
         });
      }
   }, [option, mapdata]);
   if (!mapLoaded) return null;
   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={cloneDeep(option)}
         constructorType={'mapChart'}
         ref={chartRef}
      />
   );
}

export default HighChartMap;
