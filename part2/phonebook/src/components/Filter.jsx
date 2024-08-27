const Filter = ({setShow, persons}) =>{

  const handleSearch = event => {
    setShow(persons.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()) ? item : null))
  }

  return (
    <>
      filter shown with: <input type="text" onChange={handleSearch} />
    </>
  )
}
export default Filter