import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import CountryDetail from './components/CountryDetail';
import CountryList from './components/CountryList';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/name/' + filter)
      .then(response => setCountries(response.data))
      .catch(() => setCountries([]));
  }, [filter]);

  return (
    <div>
      <span>find countries</span>
      <input type='text' onChange={event => setFilter(event.target.value)} />

      {selectedCountry ? (
        <CountryDetail {...selectedCountry} />
      ) : (
        <CountryList
          countries={countries}
          onSelectCountryHandler={country => setSelectedCountry(country)}
        />
      )}
    </div>
  );
};

export default App;
