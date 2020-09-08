import React from 'react'
import { Button } from '../Button/Button'

export const ButtonPrimary= ({ label, onClick, name, value, disabled = false }) => {
  return <Button className="primary" name={name} value={value} onClick={onClick} disabled={disabled}>{label}</Button>
}
