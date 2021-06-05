import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid } from '@material-ui/core';
import { useState } from 'react';
import LineChart from './HightChart/LineChart';
import HighChartMap from './HightChart/HighChartMap';

ChartCovid.propTypes = {
   report: PropTypes.array.isRequired,
};

function ChartCovid({ report = [], selectedCountry }) {
   const [mapdata, setMapdata] = useState({});
   useEffect(() => {
      if (selectedCountry) {
         import(
            `@highcharts/map-collection/countries/${selectedCountry}/${selectedCountry}-all.geo.json`
         ).then((res) => setMapdata(res));
         console.log(mapdata);
      }
   }, [selectedCountry]);
   return (
      <Grid container spacing={3}>
         <Grid item sm={8} xs={12}>
            <Card>
               <LineChart data={report} />
            </Card>
         </Grid>
         <Grid item sm={4} xs={12}>
            <Card>
               <HighChartMap data={report} mapdata={mapdata} />
            </Card>
         </Grid>
      </Grid>
   );
}

export default ChartCovid;
