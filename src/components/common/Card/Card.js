import React from 'react'
import './card.scss'

export const Card = ({ children, title }) => {
  return (
    <section className="card-box">
      { title ? <h1>{title}</h1> : '' }
      {children}
    </section>
  )
}
