import React from 'react';

const CountryList = ({ countries, onSelectCountryHandler }) => {
  let countryList = <p>Too many matches, please specify another filter</p>;

  if (countries.length > 0 && countries.length <= 10) {
    countryList = countries.map(country => (
      <p key={country.alpha3Code}>
        {country.name}
        <button onClick={() => onSelectCountryHandler(country)}>show</button>
      </p>
    ));
  }

  return countryList;
};

export default CountryList;
