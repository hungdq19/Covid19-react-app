import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ChartCovid from './Component/ChartCovid';
import CountrySelector from './Component/CountrySelector';
import Highlight from './Component/Highlight';
import { sortBy } from 'lodash';
import { Container, Typography } from '@material-ui/core';
function App() {
   const [country, setCountry] = useState([]);
   const [selectedCountry, setSelectedCountry] = useState('');
   const [report, setReport] = useState([]);
   //Get du lieu, Lay thong tin cac thanh pho theo API
   useEffect(() => {
      (async () => {
         const { data } = await axios.get('https://api.covid19api.com/countries');
         const sortData = sortBy(data, 'Country');
         setCountry(sortData);
      })();
   }, []);
   // Xu li du lieu khi nguoi dung chon ten thanh pho
   const handleChange = (e) => {
      setSelectedCountry(e.target.value);
   };
   // Lay du lieu tra ve tu api luu va trog state de truyen xuong duoi cac component con

   useEffect(() => {
      if (selectedCountry) {
         (async () => {
            const findCountry = country.find((x) => x.ISO2.toLowerCase() === selectedCountry);
            console.log(findCountry);
            const { data } = await axios.get(
               `https://api.covid19api.com/dayone/country/${findCountry?.Slug}`
            );
            data.pop();
            console.log(data);
            setReport(data);
         })();
      }
   }, [country, selectedCountry]);
   return (
      <Container>
         <Typography variant="h2" component="h2">
            SỐ LIỆU COVID_19
         </Typography>
         <CountrySelector countries={country} handleChange={handleChange} value={selectedCountry} />
         <Highlight report={report} />
         <ChartCovid report={report} selectedCountry={selectedCountry} />
      </Container>
   );
}

export default App;
