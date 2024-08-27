import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState("")
  const [showcontries, setShowCountries] = useState([])
  
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
    filter.length <= 10 && filter.length >= 1 ? setShowCountries(prev => filter): setShowCountries(prev => [])
  }

  return (
    <>
      find countries <input type='text' placeholder='search country...' value={search} onChange={handleSearch}/>
      {showcontries.length >=1?
      showcontries.map(item =>{
        return <p key={item.area}>{item.name.common}</p>
      }) :
      <p>demaciados generica la busqueda, por favor incluye mas caracteres...</p>}
    </>
  )
}

export default App
