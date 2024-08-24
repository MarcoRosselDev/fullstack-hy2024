const Content = ({parts}) => {
  return (
    <div>
      {parts.map(item => <Part part={item.name} exercises={item.exercises} />)}
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
    <>
      <Header title={course.name}/>
      <Total  parts={course.parts}/>
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((item) => <Course key={item.id} course={item}/>)}
    </div>
  ) 
}

export default App