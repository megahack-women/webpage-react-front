import React from 'react'
import { useErrors } from '../../../context/Error'

const Input = ({ type, placeholder, name, state, setState, validation, onKeyUp, required }) => {
  const { hasErrorBy, handlerErrors } = useErrors()

  const handlerOnBlur = (e) => {
    handlerErrors(name, e.target.value, validation)
  }

  const handlerOnChange = (e) => {
    const value = e.target.value
    setState({
      ...state,
      [e.target.name]: value
    })
  }

  return (
      <input type={type} 
        className={hasErrorBy(name) ? 'input-error' : ''} 
        onChange={handlerOnChange} 
        onBlur={handlerOnBlur}
        onKeyUp={onKeyUp}
        name={name} 
        placeholder={placeholder} 
      />
  )
}

export default Input
