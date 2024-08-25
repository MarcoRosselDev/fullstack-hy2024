import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import axios from "axios";

const App = () => {
  // persons array for testing
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) =>{
      // manejar respuesta exitosa
      setPersons(response.data)
    })
    .catch((error) => {
      // manejar error
      console.log(error);
    })},[])

  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
      <Persons search={search} persons={persons}/>
    </div>
  )
}

export default App
/* example: 
<form>
  <div>name: <input /></div>
  <div>number: <input /></div>
  <div><button type="submit">add</button></div>
</form>
 */
/* import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} 
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App */