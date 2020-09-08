import React from 'react'
import './input-box.scss'

export const InputBox = ({ label, children, subtitle, required }) => {
  return (
    <div className="input-box">
      <label>{label}{ required ? '*' : '' }</label>
      <p>{subtitle}</p>
      {children}
    </div>
  )
}
