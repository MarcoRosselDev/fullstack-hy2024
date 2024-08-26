const Filter = ({setFilter, persons}) =>{
  const handleSearch = event => {
    //const a = persons.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()) ? item: null)
    //console.log(a);
    let search = persons.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()) ? item : null)
    console.log(search, 'on filter');
    
    setFilter(search)
  }
  return (
    <>filter shown with: <input type="text" id="filter-id" onChange={handleSearch}/></>
  )
}
export default Filter