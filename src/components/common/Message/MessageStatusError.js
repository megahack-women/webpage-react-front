import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faServer, faFrown } from '@fortawesome/free-solid-svg-icons'
import { useErrors } from '../../../context/Error'
import { formatMessage } from '../../../dictionary/config'

const status = {
  401: { id: 'LOGIN_MESSAGE_ERROR', icon: faLock },
  404: { id: 'NOT_FOUND_ERROR', icon: faFrown },
  500: { id: 'SERVER_MESSAGE_ERROR', icon: faServer }
}

const RequestError = () => {
  const { errors } = useErrors()
  const requestErrors = errors.filter(error => error.type === 'request')
  return (requestErrors.map(err => (
    <p className="msg status error">
      <FontAwesomeIcon icon={status[err.status].icon} /> { formatMessage(status[err.status].id) }
    </p>
  )))
}

export const MessageStatusError = ({ children }) => {
  const { hasErrorBy } = useErrors()
  const show = hasErrorBy('request')

  return (
    <>
      { show ? <RequestError /> : null }
    </>
  )
}
