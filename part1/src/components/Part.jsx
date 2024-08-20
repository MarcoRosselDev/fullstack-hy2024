const Content = params => {
  const { part,  exercises } = params
  return (
    <p>{part} {exercises}</p>
  )
}
export default Content