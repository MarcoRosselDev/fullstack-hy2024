const PersonForm = ({newName, newNumber, setNewNumber, setNewName, persons, setPersons}) => {
  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }
  const addName = event => {
    event.preventDefault()
    const n = {name: newName,number: newNumber, id: persons.length + 1}
    if (persons.find(i => i.name === n.name )) {
      alert(`${n.name} is already added to phonebook`)
    }
    setPersons(persons.concat(n))
    setNewName("")
    setNewNumber("")
  }
  return (
  <form onSubmit={addName} >
    <div>
      name: <input onChange={handleNameChange} value={newName}/>
    </div>
    <div>
      number: <input onChange={handleNumberChange} value={newNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
export default PersonForm