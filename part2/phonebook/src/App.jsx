import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }
  const handleSearch = event => {
    const a = persons.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()) ? item: null)
    //console.log(a);
    setSearch(a)
  }

  const addName = event => {
    event.preventDefault()
    const n = {name: newName,number: newNumber, id: persons.length + 1}
    if (persons.find(i => i.name === n.name )) {
      alert(`${n.name} is already added to phonebook`)
    } else{
      setPersons(persons.concat(n))
      setNewName("")
      setNewNumber("")
    }
  }

  const show = search? search.map(item => <p key={item.name}>{item.name} {item.number}</p>): persons.map(item => <p key={item.name}>{item.name} {item.number}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input type="text" onChange={handleSearch}/>
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
      <h2>Numbers</h2>
      {show}
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