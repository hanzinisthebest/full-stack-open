import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((response) => {
          setCountry({ found: true, data: response.data });
        })
        .catch(() => setCountry({ found: false }));
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

    // Check if `country.data` exists before rendering its details
    if (!country.data) {
      return <div>Data not available</div>; // Fallback if data structure is unexpected
    }
  // Ensure that `country.data` exists and has the necessary properties
  return (
    <div>
      <h3>{country.data.name?.common || "No name available"}</h3>
      <div>capital {country.data.capital || "No capital available"}</div>
      <div>population {country.data.population || "No population available"}</div>
      <img
        src={country.data.flags?.svg || ""}
        height="100"
        alt={`flag of ${country.data.name?.common || "unknown"}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const country = useCountry(nameInput.value);

  const fetch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
