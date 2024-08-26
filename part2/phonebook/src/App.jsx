import { useEffect, useState } from "react"
import services from './services/numbers'

const App = () =>{

  const [persons, setPersons] = useState([])
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [show, setShow] = useState([])

  useEffect(()=>{
    services
    .getAll()
    .then(data =>{
      setPersons(data)
      setShow(data)
    })
  },[])

  const handleName = event => {
    setName(event.target.value)
  }
  const handleNumber = event => {
    setNumber(event.target.value)
  }
  const addNumber = event => {
    event.preventDefault()
    services
    .addPhone({name, number})
    .then(data =>{
      console.log(data, 'from create a new phone number');
      setShow(prev => prev.concat(data))
      setPersons(prev => prev.concat(data))
      setName(prev => "")
      setNumber(prev => "")
    })
  }
  const deleteNumber = id => {
    services
    .deletePhone(id)
    .then(data=>{
      setPersons(prev => prev.filter(item => item.id !== data.id))
    })
  }
  const handleSearch = event => {
    setShow(persons.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()) ? item : null))
  }
  return (
    <div>
      serch: <input type="text" onChange={handleSearch} />
      <h2>new number</h2>
      <form action="" onSubmit={addNumber}>
        <input type="text" onChange={handleName} value={name} /><br/>
        <input type="text" onChange={handleNumber} value={number} /><br/>
        <button type="submit">add</button>
      </form>
      {persons.map(item => {
        if (show.find(i => i.id === item.id)){
          return (
            <div key={item.id}>
              {item.name} {item.number}<button onClick={() => deleteNumber(item.id)}>delete</button>
            </div>)
        } else {
          return
        }
        return (
        <div key={item.id}>
          {item.name} {item.number}<button onClick={() => deleteNumber(item.id)}>delete</button>
        </div>)
      })}
    </div>
  )
}

export default App