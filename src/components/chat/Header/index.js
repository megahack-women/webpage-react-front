import React from 'react'
import { NavLink } from 'react-router-dom'
import FeatherArrowLeft from '../../../icons/feather-arrow-left.svg'

export const Header = () => {
  return (
    <header>
      <NavLink to="/">
        <img src={FeatherArrowLeft} alt="voltar" />
      </NavLink>
      <p>Iniciando analise de crédito</p>
    </header>
  )
}
