import { Box, FormHelperText, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import PropTypes from 'prop-types';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
CountrySelector.propTypes = {
   handleChange: PropTypes.func,
   value: PropTypes.string,
   countries: PropTypes.array,
};
const useStyles = makeStyles({
   root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      textAlign: 'center',
   },
});
function CountrySelector({ value = '', handleChange, countries }) {
   const classes = useStyles();
   return (
      <Box margin={5} className={classes.root}>
         <FormControl>
            <InputLabel htmlFor="county-selector" shrink>
               Quốc Gia
            </InputLabel>
            <NativeSelect
               value={value}
               onChange={handleChange}
               inputProps={{
                  name: 'country',
                  id: 'county-selector',
               }}
            >
               {/* Option of model selector */}
               {countries.map((x) => (
                  <option key={uuidv4()} value={x.ISO2.toLowerCase()} key={x.id}>
                     {x.Country}
                  </option>
               ))}
            </NativeSelect>
            <FormHelperText>Lựa chọn quốc gia</FormHelperText>
         </FormControl>
      </Box>
   );
}

export default CountrySelector;
