import Person from "./Person"

const Persons = ({search, persons, setPersons}) => {
  return search? 
  search.map(item => <Person key={item.id} id={item.id} name={item.name}  persons={persons} number={item.number} setPersons={setPersons}/>): 
  persons.map(item => <Person key={item.id} id={item.id} name={item.name} persons={persons} number={item.number} setPersons={setPersons}/>)
}

export default Persons