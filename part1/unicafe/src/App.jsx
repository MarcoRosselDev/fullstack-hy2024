import { useState } from 'react'
import "./style.css"

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const total = bad + neutral + good;
  const positive =  good/total * 100;
  const average = (good - bad) / total;
  return (
    <table>
      <tbody>
        <StatisticLine text="good"  value={good} />
        <StatisticLine text="neutral"  value={neutral} />
        <StatisticLine text="bad"  value={bad} />
        <StatisticLine text="all"  value={total} />
        <StatisticLine text="average"  value={average? average.toFixed(2): 0} />
        <StatisticLine text="positive"  value={positive? positive.toFixed(2): 0} />
      </tbody>
    </table>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <div id='btns'>
        <button onClick={() => setGood(prev => prev + 1)}>good</button>
        <button onClick={() => setNeutral(prev => prev + 1)}>neutral</button>
        <button onClick={() => setBad(prev => prev + 1)}>bad</button>
      </div>
      <h3>statistics</h3>
      {good || neutral || bad? <Statistics good={good} neutral={neutral} bad={bad}/> : <p>No feedback given</p>}
      
    </>
  )
}
export default App