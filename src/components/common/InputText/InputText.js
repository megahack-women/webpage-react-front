import React from 'react'
import './input.scss'
import { InputBox } from '../InputBox/InputBox'
import { useErrors } from '../../../context/Error'
import Input from '../Input/Input'
import { MessageError } from '../Message/MessageError.js'
import { formatMessage } from '../../../dictionary/config'

export const InputText = ({ label, placeholder, subtitle, name, state, setState, required = false }) => {
  
  const { hasErrorBy } = useErrors()

  const isRequired = (value) => {
    if (required) {
      return value !== ''
    }
    return true
  }

  return (
    <InputBox label={label} subtitle={subtitle} required>
      <Input 
        type="text" 
        state={state} 
        setState={setState} 
        name={name} 
        placeholder={placeholder}
        validation={isRequired}
        required 
      />
      <MessageError show={hasErrorBy(name)}>
        { formatMessage('REQUIRED_MESSAGE_ERROR', { field: label }) }
      </MessageError>
    </InputBox>
  )
}
