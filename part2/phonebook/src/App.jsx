import { useEffect, useState } from "react"
import services from './services/numbers'
import PersonForm from './components/PersonForm'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import Msg from './components/Msg'

const App = () =>{

  const [persons, setPersons] = useState([])
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [show, setShow] = useState([])
  const [typeMsg, setTypeMsg] = useState("hidden")
  const [msgState, setMsgState] = useState("")

  useEffect(()=>{
    services
    .getAll()
    .then(data =>{
      setPersons(data)
      setShow(data)
    })
  },[])

  return (
    <div>
      <h1>Phonebook</h1>
      <Msg
      str={msgState}
      type={typeMsg}
      setTypeMsg={setTypeMsg}
      setMsgState={setMsgState}
      />
      <Filter 
      setShow={setShow}
      persons={persons}
      />
      <h1>add a new</h1>
      <PersonForm 
      setNumber={setNumber}
      setName={setName}
      name={name}
      number={number}
      persons={persons}
      setShow={setShow}
      setPersons={setPersons}
      str={msgState} 
      type={typeMsg} 
      setTypeMsg={setTypeMsg}
      setMsgState={setMsgState}
      />
      <h1>Numbers</h1>
      <Persons 
      persons={persons} 
      show={show}
      setPersons={setPersons}
      setTypeMsg={setTypeMsg}
      setMsgState={setMsgState}
      />
    </div>
  )
}

export default App