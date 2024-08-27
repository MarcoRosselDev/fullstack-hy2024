import services from '../services/numbers'

const Person = ({name, number, id, setPersons, setMsgState, setTypeMsg}) => {

  const deleteNumber = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name} ?`)) {
      services
      .deletePhone(id)
      .then(data=>{
        setPersons(prev => prev.filter(item => item.id !== data.id))

        setMsgState(perv => `Deleted ${data.name} number`)
        setTypeMsg(perv => "error")

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