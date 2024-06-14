import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import axios from 'axios'
import phonebook from './services/phonebook'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    phonebook.getAll().then(response => {
      console.log('promise fulfilled')
      setPersons(response)  
    })
  }
  useEffect(hook, [])
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlenumberChange = (event) => {
    setNewNumber(event.target.value)
  } 

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if(persons.find(person => person.name === newName)) {
      const confirm = window.confirm(`${newName} is already added to phonebook do you want to replace the old number?`)
      if(!confirm) {
        return
      }
      const person = persons.find(person => person.name === newName)
      const changedPerson = {...person, number: newNumber}
      phonebook
        .update(person.id, changedPerson)
        .then(response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response))
          setNewName('')
          setNewNumber('')
        })

      return
    }
    phonebook
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const confirm = window.confirm(`Delete ${person.name}?`)
    if(confirm) {
      phonebook
        .remove(id)
        .then((deletedData) => {
          console.log('Deleted data:', deletedData);
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
        });
    }
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handlenumberChange={handlenumberChange} handleNameChange={handleNameChange} />
      <Numbers deletePerson={deletePerson} persons={persons} filter={filter} />
    </div>
  )
}

export default App