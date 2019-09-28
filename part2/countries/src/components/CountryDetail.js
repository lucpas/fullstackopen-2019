import React from 'react';

const CountryDetail = props => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>capital {props.capital}</p>
      <p>population {props.population}</p>
      <h2>languages</h2>
      <ul>
        {props.languages.map(lang => (
          <li key={lang.iso639_1}>{lang.name}</li>
        ))}
      </ul>
      <img src={props.flag} alt='Offical flag of {props.name}' />
    </div>
  );
};

export default CountryDetail;
