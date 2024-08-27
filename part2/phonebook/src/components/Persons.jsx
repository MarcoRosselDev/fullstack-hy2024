import Person from './Person'

const Persons = ({persons, show, setPersons, setTypeMsg, setMsgState}) => {

  return (
    <>
      {persons.map(item => {
        if (show.find(i => i.id === item.id)){
          return (
            <Person
            key={item.id}
            name={item.name}
            number={item.number}
            id={item.id}
            setPersons={setPersons}
            setTypeMsg={setTypeMsg}
            setMsgState={setMsgState}
            />)
        } else {
          return
        }
      })}
    </>
  )
}

export default Persons