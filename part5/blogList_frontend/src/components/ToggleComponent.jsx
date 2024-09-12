import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const ToggleComponent = ({ textShow, textHide, children }) => {
  const [show, setShow] = useState(true)

  const handleShow = () => {
    setShow((prev) => !prev)
  }

  const hideWhenVisible = { display: show ? 'none' : '' }
  const showWhenVisible = { display: show ? '' : 'none' }
  return (
    <div className="toggle-comp">
      <div style={hideWhenVisible}>
        {children}
        <button onClick={handleShow}>{textHide}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={handleShow}>{textShow}</button>
      </div>
    </div>
  )
}

export default ToggleComponent
