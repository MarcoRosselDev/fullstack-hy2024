import services from '../services/numbers'

const Person = ({name, number, id, setPersons}) => {

  const deleteNumber = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name} ?`)) {
      services
      .deletePhone(id)
      .then(data=>{
        setPersons(prev => prev.filter(item => item.id !== data.id))
      })
    }
  }


  return (
    <div key={id}>
    {name} {number}<button onClick={() => deleteNumber(id, name)}>delete</button>
    </div>
  )
}

export default Person