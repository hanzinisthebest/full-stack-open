import React from 'react';

const Result = ({ countries }) => {
  if (countries.length === 0) {
    return <div>No countries found</div>;
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <p>Subregion: {country.subregion}</p>
        <p>Languages: {Object.values(country.languages).join(', ')}</p>
        <p>Currency: {Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
      </div>
    );
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca3}>
          {country.name.common}
        </div>
      ))}
    </div>
  );
};

export default Result;
