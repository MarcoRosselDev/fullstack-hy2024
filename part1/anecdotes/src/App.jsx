import { useState } from 'react'
import './index.css';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  // Establish my favorite anecdote as the most voted one to test the logic
  const [votes, setVotes] = useState([0, 0, 0, 3, 1, 0, 0, 0])
  const [selected, setSelected] = useState(0)

  const handleVote = index => {
    const newArr = [...votes]
    newArr[index] += 1;
    setVotes(newArr);
  }
  // find te value most bigest of the array to apply findIndex on the votes array
  const mostVotes = [...votes].sort((a, b) => b - a)[0]
  // this find is used to print the anecdotes most voted
  const find = [...votes].findIndex(el => el === mostVotes)

  return (
    <>
    <div className='container'>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <div className='btns'>
        <p>has {votes[selected]} votes</p>
        <button onClick={() => handleVote(selected)}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Next anecdote</button>
      </div>
    </div>
    <div className='most-voted'>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[find]}</p>
      <p>has {mostVotes} votes</p>
    </div>
    </>
  )
}

export default App