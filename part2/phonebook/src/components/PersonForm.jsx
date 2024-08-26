import services from '../services/numbers'

const PersonForm = ({newName, newNumber, setNewNumber, setNewName, persons, setPersons}) => {
  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }
  const addName = event => {
    event.preventDefault()
    const n = {name: newName,number: newNumber}
    if (persons.find(i => i.name === n.name )) {
      alert(`${n.name} is already added to phonebook`)
      return
    }
    services
    .addPhone(n)
    .then(newNote =>{
      setPersons(persons.concat(newNote))
      setNewName(prev => "")
      setNewNumber(prev => "")
    })
    .catch(err => console.log(err))
  }
  return (
  <form onSubmit={addName} >
    <div>
      name: <input onChange={handleNameChange} value={newName}/>
    </div>
    <div>
      number: <input onChange={handleNumberChange} value={newNumber}/>
    </div>
      <button type="submit">add</button>
  </form>
  )
}
export default PersonForm