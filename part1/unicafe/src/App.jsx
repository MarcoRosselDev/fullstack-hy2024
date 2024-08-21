import { useState } from 'react'
import "./style.css"

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>gove feedback</h1>
      {/* <table>
        <tr>
          <td>Hola, soy tu primera celda</td>
          <td>Hola, soy tu sogunda celda</td>
          <td>Hola, soy tu tercera celda</td>
        </tr>
        <tr>
          <th>hi</th>
          <td>912</td>
        </tr>
        <tr>
          <td>hi</td>
          <td>0</td>
          <td>1</td>
          <td>912</td>
        </tr>
        <tr>
          <td>hi</td>
          <td>0</td>
          <td>1</td>
          <td>912</td>
        </tr>
      </table> */}
      <table>
        <tr>
          <th colSpan="2">Animales</th>
        </tr>
        <tr>
          <th>Hipopótamo</th>
          <td rowSpan="2">Yegua</td>
        </tr>
        <tr>
          <th>Caballo</th>
        </tr>
        <tr>
          <td>Semental</td>
        </tr>
        <tr>
          <th>Cocodrilo</th>
        </tr>
        <tr>
          <th>Pollo</th>

          <td>Gallina</td>
        </tr>
        <tr>
          <td>Gallo</td>
        </tr>
      </table>
    </>
  )
}

export default App