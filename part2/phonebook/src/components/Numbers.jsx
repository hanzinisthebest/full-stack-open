import React from 'react'

const Numbers = ({persons, filter}) => {
  return (
    <>
    <h2>Numbers</h2>
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.toLowerCase().includes(filter.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
    </>
  )
}

export default Numbers