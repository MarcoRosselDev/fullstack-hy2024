import { useState } from 'react'
import "./style.css"

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const positive =  good/(bad + neutral + good) * 100;
  const average = (good - bad) / (good + bad + neutral);

  return (
    <>
      <h1>give feedback</h1>
      <div>
      <button onClick={() => setGood(prev => prev + 1)}>good</button>
      <button onClick={() => setNeutral(prev => prev + 1)}>neutral</button>
      <button onClick={() => setBad(prev => prev + 1)}>bad</button>
      </div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{bad + neutral + good}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average.toFixed(2)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive.toFixed(2)} %</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
export default App