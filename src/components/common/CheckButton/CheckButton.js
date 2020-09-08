import React from 'react'
import './check-button.scss'

export const CheckButton = ({ value, name, children, handlerChange, checked }) => {

  const onChange = (e) => {
    handlerChange(e)
  }

  return (
    <div className="checkbox-container"> 
      <div className="checkbox-input">
        <input type="checkbox" name={name} onChange={onChange} value={value} checked={checked} />
        <span className="checkmark"></span>
      </div>
      <div className="checkbox-label">{children}</div>
    </div>
  )
}
