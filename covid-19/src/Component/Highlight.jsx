import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import HighLightCard from './HighLightCard';
import { v4 as uuidv4 } from 'uuid';

Highlight.propTypes = {
   report: PropTypes.array.isRequired,
};

function Highlight({ report = [] }) {
   const data = report[report.length - 1];
   const update = [
      { id: uuidv4(), title: 'Số Ca nhiễm', count: data?.Confirmed, type: 'Confirmed' },
      { id: uuidv4(), title: 'Số Ca đã Khỏi', count: data?.Recovered, type: 'Recovered' },
      { id: uuidv4(), title: 'Số ca chết', count: data?.Deaths, type: 'Deaths' },
   ];
   return (
      <Grid container spacing={3}>
         {update.map((x) => (
            <Grid key={x.id} item sm={4} xs={12}>
               <HighLightCard title={x.title} count={x.count} type={x.type} />
            </Grid>
         ))}
      </Grid>
   );
}

export default Highlight;
