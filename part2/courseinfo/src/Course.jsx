const Content = ({parts}) => {  
  return (
    <div>
      {parts.map((item) => <Part part={item.name} key={item.id} exercises={item.exercises} />)}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  return (
    <p> <strong>total of {total} exercises</strong></p>
  )
}

const Part = ({part, exercises}) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Header = params => {
  return (
    <h1>{params.title}</h1>
  )
}

const Course = ({course}) =>{
  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts} />
      <Total  parts={course.parts}/>
    </div>
  )
}

export default Course