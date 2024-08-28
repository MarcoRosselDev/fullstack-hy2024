import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = data => {
  const info = data.data[0]
  let lengs = Object.values(info.languages)
  return (
    <div>
      <h1>{info.name.common}</h1>
      <p>capital : {info.capital[0]}</p>
      <p>area : {info.area}</p>
      {lengs.length > 1 ? <><p><strong>languages : </strong></p><ul>{lengs.map((item, index) => <li key={index}>{item}</li>)}</ul></>: <p><strong>languages : </strong> {lengs[0]} </p>}
      <img src={info.flags.svg} alt={info.flags.alt} style={{width: "200px", border: "solid 1px black"}}/>
     </div>
  )
}

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState("")
  const [showList, setShowList] = useState([])
  const [showcontrie, setShowCountrie] = useState([])
  
  const getAll = () => {
    const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    return request.then(response => response.data)
  }
  useEffect(() =>{
    getAll()
    .then(data =>{
      setAllCountries(prev => data)// ahora es un array con 250 paises
    })
  },[])

  const handleSearch = event => {
    setSearch(event.target.value)
    const filter = allCountries.filter(item => item.name.common.toLowerCase().includes(event.target.value.toLowerCase())? item: null)
    filter.length <= 10 && filter.length >= 1 ? setShowList(prev => filter): setShowList(prev => [])
    filter.length === 1? setShowCountrie(prev =>filter) : setShowCountrie(prev => []) 
  }

  const handleShow = info => {
    console.log(info);
    setShowCountrie(prev => [info])
    setShowList(prev => [info])
    setSearch(prev => "")
  }
  return (
    <>
      find countries <input type='text' placeholder='search country...' value={search} onChange={handleSearch}/>
      {showList.length >1?
      showList.map(item =>{
        return <div key={item.area} style={{display: "flex", gap: "10px", alignItems:"center", border: "1px solid black", width: "200px", padding: "5px", marginTop: "5px"}}><p>{item.name.common}</p><button onClick={() => handleShow(item)} style={{height: "30px"}}>show</button></div>
      }) : showList.length === 1?
      <></>:
      <p>Too many matches, specify another filter</p>}
      {showcontrie.length >= 1? <Country data={showcontrie}/>: null}
    </>
  )
}

export default App
