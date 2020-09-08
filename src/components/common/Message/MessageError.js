import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

export const MessageError = ({ show, children }) => {
  return (
    <>
      { show ? <p className="msg error">
        <FontAwesomeIcon icon={faExclamationTriangle} /> { children }</p> : null }
    </>
  )
}
