const Filter = ({setSearch, persons}) =>{
  const handleSearch = event => {
    const a = persons.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()) ? item: null)
    //console.log(a);
    setSearch(a)
  }
  return (
    <>filter shown with: <input type="text" onChange={handleSearch}/></>
  )
}
export default Filter