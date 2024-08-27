import services from '../services/numbers'

const PersonForm = ({setName, setNumber, name, number, persons, setShow, setPersons}) => {
  const handleName = event => {
    setName(event.target.value)
  }
  const handleNumber = event => {
    setNumber(event.target.value)
  }
  const addNumber = event => {
    event.preventDefault()
    const find = persons.find(item => item.name === name)
    if (find) {
      if(window.confirm(`${find.name} is already added to phonebook, replace the old number with a new one?`)) {
        services
        .putPhone(find.id, {name,number, id: find.id})
        .then(data =>{
          setShow(prev => prev.filter(i => i.name !== data.name).concat(data))
          setPersons(prev => prev.filter(i => i.name !== data.name).concat(data))
          setName(prev => "")
          setNumber(prev => "")            
        })
        .catch(err => console.log(err))
      }
    } else {
      services
      .addPhone({name, number})
      .then(data =>{
        setShow(prev => prev.concat(data))
        setPersons(prev => prev.concat(data))
        setName(prev => "")
        setNumber(prev => "")
      })  
    }
  }

  return (
    <form onSubmit={addNumber}>
      name: <input type="text" onChange={handleName} value={name} /><br/>
      number: <input type="text" onChange={handleNumber} value={number} /><br/>
      <button type="submit">add</button>
    </form>
  )
}
export default PersonForm