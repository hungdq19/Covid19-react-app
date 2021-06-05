import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

HighLightCard.propTypes = {
   title: PropTypes.string,
   count: PropTypes.number,
   type: PropTypes.string,
};
const useStyles = makeStyles({
   root: (props) => {
      if (props.type === 'Confirmed') return { border: '10px solid #c9302c' };
      if (props.type === 'Recovered') return { border: '10px solid green' };
      else return { border: '10px solid gray' };
   },
   title: {
      fontSize: 20,
      marginBottom: 5,
   },
   count: {
      fontWeight: 'bold',
      fontSize: 20,
   },
});

function HighLightCard({ title, count, type }) {
   const classes = useStyles({ type });
   return (
      <Card className={classes.root}>
         <CardContent>
            <Typography component="p" variant="body2" className={classes.title}>
               {title}
            </Typography>
            <Typography component="span" variant="body2" className={classes.count}>
               {count}
            </Typography>
         </CardContent>
      </Card>
   );
}

export default HighLightCard;
