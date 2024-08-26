import services from '../services/numbers'

const Person = ({name, number, id, setPersons, persons}) => {
  const deleteBtn = (id) => {
    console.log(id);
    services
    .deletePhone(id)
    .then(data =>{
      console.log(data);
      setPersons(persons.filter(item => item.id !== data.id))
    })
    .catch(err => console.log(err))
  }
  return (
    <>
      <p>{name} {number}</p>
      <button onClick={(event) => {
        event.preventDefault()
        deleteBtn(id)
      }}>Delete</button>
    </>
  )
}

export default Person