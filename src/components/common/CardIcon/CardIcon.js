import React from 'react'
import './card-icon.scss'
import { Card } from '../Card/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CardIcon = ({ children, title, icon = false, iconFA, alt }) => {
  return (
    <div className="card-box-icon">
      <Card title={title}>
        { icon ? 
          <img className="card-icon" src={icon} alt={alt} /> :
          <FontAwesomeIcon icon={iconFA} /> }
        {children}
      </Card>
    </div>
  )
}
