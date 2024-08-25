const Persons = ({search, persons}) => {
  return search? 
  search.map(item => <p key={item.name}>{item.name} {item.number}</p>): 
  persons.map(item => <p key={item.name}>{item.name} {item.number}</p>)
}

export default Persons