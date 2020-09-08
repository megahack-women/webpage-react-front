import React from 'react'
import './radio-button.scss'

export const RadioButton = ({ value, name, children, handlerChange }) => {

  const onChange = (e) => {
    handlerChange(e)
  }

  return (
    <div className="radio-container"> 
      <div className="radio-input">
        <input type="radio" name={name} onChange={onChange} value={value} />
        <span className="checkmark"></span>
      </div>
      <div className="radio-label">{children}</div>
    </div>
  )
}
