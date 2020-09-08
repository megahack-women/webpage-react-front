import React, { createContext, useState, useContext } from 'react'

const ErrorContext = createContext()

const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([])

  const hasErrors = () => errors.length > 0

  const hasErrorBy = (type) => { 
    return !!errors.find(error => error.type === type)
  }

  const pushError = (error) => {
    const newErrors = [...errors]
    newErrors.push(error)
    setErrors(newErrors)
  } 

  const handlerErrors = (errorType, value, validation) => {
    let newErrors = [...errors]
    if (validation) {
      if (validation(value)) { 
        newErrors = newErrors.filter(error => error.type !== errorType)
      } else {
        if (!hasErrorBy(errorType)) {
          newErrors.push({ type: errorType })
        }
      }
    }

    setErrors(newErrors)
  }

  return (
    <ErrorContext.Provider value={
      { errors, setErrors, hasErrors, hasErrorBy, pushError, handlerErrors }
    }>
      { children }
    </ErrorContext.Provider>
  )
}

export const useErrors = () => {
  const context = useContext(ErrorContext)
  if (!context) throw new Error('useError must be used within a ErrorProvider')
  const { errors, setErrors, hasErrors, hasErrorBy, pushError, handlerErrors } = context
  return { errors, setErrors, hasErrors, hasErrorBy, pushError, handlerErrors }
}

export default ErrorProvider