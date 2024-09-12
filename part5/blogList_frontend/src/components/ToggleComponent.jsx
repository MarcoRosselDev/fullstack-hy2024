import { useState } from 'react'

const ToggleComponent = ({ text, children }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow((prev) => !prev)
  }

  const hideWhenVisible = { display: show ? 'none' : '' }
  const showWhenVisible = { display: show ? '' : 'none' }
  return (
    <>
      <div style={hideWhenVisible}>
        {children}
        <button onClick={handleShow}>ocultar {text}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={handleShow}>{text}</button>
      </div>
    </>
  )
}

export default ToggleComponent
