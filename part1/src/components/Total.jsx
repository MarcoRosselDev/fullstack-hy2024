const Total = params => {
  const {exercises1, exercises2, exercises3} = params
  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  )
}
export default Total