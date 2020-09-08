import React from 'react'
import { Button } from '../Button/Button'

export const ButtonSecondary = ({ label, onClick, disabled = false }) => {
  return <Button className="secondary" disabled={disabled} onClick={onClick}>{label}</Button>
}
