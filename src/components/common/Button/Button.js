import React from 'react'

export const Button = ({ onClick, disabled = false, className, name, value, children }) => {
  return (
    <button 
      onClick={onClick} 
      type="button" 
      className={`button ${className}`}
      disabled={disabled}
      name={name}
      value={value}
    >
      { children }
    </button>
  )
}
