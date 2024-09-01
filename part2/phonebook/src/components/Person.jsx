import services from '../services/numbers'

const Person = ({name, number, id, setPersons, setMsgState, setTypeMsg, persons}) => {

  const deleteNumber = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name} ?`)) {
      services
      .deletePhone(id)
      .then(data=>{
        console.log(data)
        if (data === 204) {
          const item = persons.find(item => item.id === id)
          setPersons(prev => prev.filter(item => item.id !== id))
          setMsgState(perv => `${item.name} deleted successful`)
          setTypeMsg(perv => "error")
        }
        
        setTimeout(() => {
          setMsgState(prev => "")
          setTypeMsg(prev => "")
        }, 2000);
      })
      .catch(err =>{
        setMsgState(perv => `some error happen : ${err}`)
        setTypeMsg(perv => "error")

        setTimeout(() => {
          setMsgState(prev => "")
          setTypeMsg(prev => "")
        }, 2000);
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