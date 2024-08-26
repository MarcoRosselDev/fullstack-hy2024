import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import services from './services/numbers'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    services
    .getAll()
    .then(data =>{
      setPersons(data)
    })
    .catch((error) => {
      console.log(error);
    })},[])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
      setSearch={setSearch} 
      persons={persons}/>

      <PersonForm 
      setNewName={setNewName} 
      setNewNumber={setNewNumber} 
      newName={newName} 
      newNumber={newNumber} 
      persons={persons} 
      setPersons={setPersons}/>

      <h2>Numbers</h2>
      <Persons search={search} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App