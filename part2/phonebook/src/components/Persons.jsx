import Person from './Person'

const Persons = ({persons, show, setPersons}) => {

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
            />)
        } else {
          return
        }
      })}
    </>
  )
}

export default Persons