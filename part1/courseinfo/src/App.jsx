import "./index.css"

const Content = params => {
  const {part1, part2, part3, exercises1, exercises2, exercises3} = params
  return (
    <div>
      <Part part={part1}  exercises={exercises1}/>
      <Part part={part2}  exercises={exercises2}/>
      <Part part={part3}  exercises={exercises3}/>
    </div>
  )
}

const Total = params => {
  const {exercises1, exercises2, exercises3} = params
  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  )
}

const Part = params => {
  const { part,  exercises } = params
  return (
    <p>{part} {exercises}</p>
  )
}

const Header = params => {
  return (
    <p>{params.title}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header title={course.name}/>
      <Content part1={course.parts[0].name} part2={course.parts[1].name} part3={course.parts[2].name} exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises}/>
      <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises}/>
    </div>
  )
}

export default App