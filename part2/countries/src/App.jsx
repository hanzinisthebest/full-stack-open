import { useState,useEffect } from 'react'
import SearchForm from './components/SearchForm'
import Result from './components/Result'
import countriesService from './services/countries-api'
function App() {
const [query, setQuery] = useState('')
const [countries, setCountries] = useState([])
const [countriesResult, setCountriesResult] = useState([])

const onChangeOfQuery = (event) => {
  const newQuery = event.target.value;
  setQuery(newQuery);
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newQuery.toLowerCase())
  );
  setCountriesResult(filteredCountries);
};

const search = (event) => {
  event.preventDefault()
  countriesService
    .getByName(query)
    .then(response => {
      setCountriesResult(response)
    })
}
const hook = () => {
  console.log('effect')
  countriesService.getAll().then(response => {
    console.log('promise fulfilled')
    setCountries(response)
  })
}

useEffect(hook, [])

  return (
    <>
    <SearchForm query={query} onChangeOfQuery={onChangeOfQuery} search={search}/>
    <Result countries={countriesResult}/>
    </>
  )
}

export default App
