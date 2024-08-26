import { useState, useEffect, useRef } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import services from './services/numbers'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState([])
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(filter);
    services
    .getAll()
    .then(data =>{
      setPersons(data)
    })
    .catch((error) => {
      console.log(error);
    })},[])

  const handleSearch = event => {
    event.target.value?
    setFilter(prev => persons.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()) ? item : null)?
    persons.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()) ? item : null):
    prev
  ):
    setFilter(prev => prev)
  }
  const handleDelete = id => {
    services
    .deletePhone(id)
    .then(response =>{
      setPersons(persons.filter(item => item.id !== id))
      console.log(response);
    })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input ref={inputRef} type="text" id="filter-id" onChange={handleSearch}/>
      {/* <Filter 
      setFilter={setFilter} 
      persons={persons}/> */}

      <PersonForm
      setNewName={setNewName} 
      setNewNumber={setNewNumber} 
      newName={newName} 
      newNumber={newNumber}
      persons={persons} 
      setPersons={setPersons}/>

      <h2>Numbers</h2>
      <div>
        {filter.length >= 1 && inputRef.current.value.length >= 1 ?filter.map(person => {
/*           console.log(inputRef.current.value.length)
          console.log(inputRef.current);
 */          
          return (
            <div key={person.id}>
              <p>{person.name} {person.number}</p>
              <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
          )
        }) : persons.map(person => {
          console.log(filter.length, inputRef.current.value);
          
          return (
            <div key={person.id}>
              <p>{person.name} {person.number}</p>
              <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
          )
        })}
      </div>
      {/* <Persons search={search} persons={persons} setPersons={setPersons}/> */}
    </div>
  )
}

export default App